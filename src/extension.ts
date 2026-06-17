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

/** Skip `.` when it's a decimal point (e.g. `2.3`, `1.80`). */
const skipDecimalPoint: SkipRule = (match, offset, fullText) => {
  if (match !== ".") return false;
  // digit before and after → it's a decimal point, not a period
  const charBefore = fullText[offset - 1];
  const charAfter = fullText[offset + 1];
  return /\d/.test(charBefore) && /\d/.test(charAfter);
};

const markdownRules: SkipRule[] = [skipOrderedList];

/**
 * Rules always applied when calling {@link replacePunctuationToChinese}.
 * Currently: decimal point protection.
 */
const defaultRules: SkipRule[] = [skipDecimalPoint];

// ── Core replace functions ─────────────────────────────────────────────

export function replacePunctuationToEnglish(text: string): string {
  return text.replace(
    chinesePunctuationRegex,
    (match) => chineseToEnglishMap.get(match)!,
  );
}

/**
 * Replace English punctuation with Chinese punctuation in text.
 * @param rules - Additional skip rules. Pass `markdownRules` for Markdown.
 */
export function replacePunctuationToChinese(
  text: string,
  rules?: SkipRule[],
): string {
  const allRules = defaultRules.concat(rules ?? []);
  return text.replace(englishPunctuationRegex, (match, offset, fullText) => {
    const shouldSkip = allRules.some((r) => r(match, offset, fullText));
    return shouldSkip ? match : englishToChineseMap.get(match)!;
  });
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
