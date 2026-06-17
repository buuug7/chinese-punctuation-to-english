import * as vscode from "vscode";
import {
  chineseToEnglishMap,
  chinesePunctuationRegex,
  englishToChineseMap,
  englishPunctuationRegex,
} from "./punctuation-map";

// ── Skip Rules ─────────────────────────────────────────────────────────
//
// A rule can prevent a matched character from being replaced.
// Return `true` to keep the original character (skip replacement).

type SkipRule = (match: string, offset: number, fullText: string) => boolean;

/** Skip `.` when it's a list/numbering marker (e.g. `1.`, `## 2.`). */
const skipOrderedList: SkipRule = (match, offset, fullText) => {
  if (match !== ".") return false;
  const lineStart = fullText.slice(0, offset).lastIndexOf("\n") + 1;
  const prefix = fullText.slice(lineStart, offset);
  return /\d+$/.test(prefix);
};

/** Skip `.` within a word: decimal (`2.3`), file extension (`file.md`/`说明.md`), version (`v3.2`). */
const skipDecimalPoint: SkipRule = (match, offset, fullText) => {
  if (match !== ".") return false;
  const charBefore = fullText[offset - 1];
  const charAfter = fullText[offset + 1];
  return /[\p{L}\p{N}]/u.test(charBefore) && /[\p{L}\p{N}]/u.test(charAfter);
};

/** Skip `>` when it's a Markdown blockquote marker (e.g. `> text`). */
const skipBlockquote: SkipRule = (match, offset, fullText) => {
  if (match !== ">") return false;
  const lineStart = fullText.slice(0, offset).lastIndexOf("\n") + 1;
  const prefix = fullText.slice(lineStart, offset);
  return /^[>\s]*$/.test(prefix);
};

/** Skip brackets/parens that are part of a Markdown link `[text](url)`. */
const skipMarkdownLink: SkipRule = (match, offset, fullText) => {
  const ahead = fullText.slice(offset + 1);
  switch (match) {
    case "[": {
      // `[` followed by text and `](` → link start
      const endBracket = ahead.indexOf("]");
      return endBracket > 0 && ahead[endBracket + 1] === "(";
    }
    case "]":
      return ahead.startsWith("(");
    case "(":
      return fullText[offset - 1] === "]";
    case ")": {
      // `)` closing a `](...)` sequence
      const before = fullText.slice(0, offset);
      const parenStart = before.lastIndexOf("(");
      return (
        parenStart > 0 &&
        fullText[parenStart - 1] === "]" &&
        !before.slice(parenStart + 1).includes("\n")
      );
    }
    default:
      return false;
  }
};

const markdownRules: SkipRule[] = [skipOrderedList, skipBlockquote, skipMarkdownLink];

/**
 * Rules always applied when calling {@link replacePunctuationToChinese}.
 * Currently: decimal point protection.
 */
const defaultRules: SkipRule[] = [skipDecimalPoint];

// ── Core replace functions ─────────────────────────────────────────────

/**
 * Protect inline code (\`…\`) and fenced code blocks (\`\`\`…\`\`\`) with
 * placeholders before conversion, then restore them after.
 * This keeps code content unchanged regardless of what punctuation it contains.
 */
function withProtectedCodeBlocks(text: string, fn: (s: string) => string): string {
  const blocks: string[] = [];

  const protected_ = text
    // inline code: `code`
    .replace(/(`[^`]*`)/g, (m) => {
      blocks.push(m);
      return `\x00CODE${blocks.length - 1}\x00`;
    })
    // fenced code blocks: ```lang\ncode\n```
    .replace(/(```[\s\S]*?```)/g, (m) => {
      blocks.push(m);
      return `\x00CODE${blocks.length - 1}\x00`;
    });

  const result = fn(protected_);

  const SEP = String.fromCharCode(0);
  return result.replace(
    new RegExp(`${SEP}CODE(\\d+)${SEP}`, "g"),
    (_, i) => blocks[+i],
  );
}

export function replacePunctuationToEnglish(text: string): string {
  return text.replace(
    chinesePunctuationRegex,
    (match) => chineseToEnglishMap.get(match)!,
  );
}

/**
 * Replace English punctuation with Chinese punctuation in text.
 * Code blocks (inline \`…\` and fenced \`\`\`…\`\`\`) are automatically protected.
 * @param rules - Additional skip rules. Pass `markdownRules` for Markdown.
 */
export function replacePunctuationToChinese(
  text: string,
  rules?: SkipRule[],
): string {
  const allRules = defaultRules.concat(rules ?? []);
  const convert = (t: string) =>
    t.replace(englishPunctuationRegex, (match, offset, fullText) => {
      const shouldSkip = allRules.some((r) => r(match, offset, fullText));
      return shouldSkip ? match : englishToChineseMap.get(match)!;
    });
  return withProtectedCodeBlocks(text, convert);
}

// ── Commands ───────────────────────────────────────────────────────────

function replaceTextToEnglish(): void {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const text = editor.document.getText();
  const replaced = replacePunctuationToEnglish(text);
  const range = new vscode.Range(
    editor.document.positionAt(0),
    editor.document.positionAt(text.length),
  );
  editor.edit((builder) => {
    builder.replace(range, replaced);
    vscode.window.showInformationMessage("成功替换标点符号为英文!");
  });
}

function replaceTextToChinese(): void {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const text = editor.document.getText();
  const rules =
    editor.document.languageId === "markdown" ? markdownRules : undefined;
  const replaced = replacePunctuationToChinese(text, rules);
  const range = new vscode.Range(
    editor.document.positionAt(0),
    editor.document.positionAt(text.length),
  );
  editor.edit((builder) => {
    builder.replace(range, replaced);
    vscode.window.showInformationMessage("成功替换标点符号为中文!");
  });
}

// ── Auto-save ──────────────────────────────────────────────────────────

function isLanguageAllowed(doc: vscode.TextDocument): boolean {
  const config = vscode.workspace.getConfiguration(
    "chinese-punctuation-to-english",
  );
  const whitelist = config.get<string[]>("autoConvertLanguageWhitelist", [
    "plaintext",
    "markdown",
  ]);
  return whitelist.length === 0 || whitelist.includes(doc.languageId);
}

function handleWillSave(event: vscode.TextDocumentWillSaveEvent): void {
  const config = vscode.workspace.getConfiguration(
    "chinese-punctuation-to-english",
  );
  if (!config.get<boolean>("autoConvertOnSave", false)) return;

  const doc = event.document;
  if (!isLanguageAllowed(doc)) return;

  const target = config.get<string>("autoConvertTarget", "english");
  const text = doc.getText();
  const rules = doc.languageId === "markdown" ? markdownRules : undefined;
  const replaced =
    target === "chinese"
      ? replacePunctuationToChinese(text, rules)
      : replacePunctuationToEnglish(text);

  if (text === replaced) return;

  const fullRange = new vscode.Range(
    doc.positionAt(0),
    doc.positionAt(text.length),
  );
  event.waitUntil(
    Promise.resolve([vscode.TextEdit.replace(fullRange, replaced)]),
  );
}

// ── Activation ─────────────────────────────────────────────────────────

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "chinese-punctuation-to-english.toEnglish",
      replaceTextToEnglish,
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "chinese-punctuation-to-english.toChinese",
      replaceTextToChinese,
    ),
  );

  context.subscriptions.push(
    vscode.workspace.onWillSaveTextDocument(handleWillSave),
  );
}

export function deactivate(): void {
  // Cleanup if needed
}
