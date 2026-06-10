import * as vscode from "vscode";
import {
  chineseToEnglishMap,
  chinesePunctuationRegex,
} from "./punctuation-map";

/**
 * Replace Chinese punctuation with English punctuation in text.
 * @param text - The input text containing Chinese punctuation.
 * @returns The text with Chinese punctuation replaced.
 */
export function replacePunctuation(text: string): string {
  return text.replace(chinesePunctuationRegex, (match) => {
    return chineseToEnglishMap.get(match)!;
  });
}

function replaceText(): void {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    return;
  }

  const text = editor.document.getText();
  const replacedText = replacePunctuation(text);

  const startPosition = new vscode.Position(0, 0);
  const endPosition = new vscode.Position(editor.document.lineCount, 0);
  const range = new vscode.Range(startPosition, endPosition);
  editor.edit((builder) => {
    builder.replace(range, replacedText);
    vscode.window.showInformationMessage("成功替换标点符号为英文!");
  });
}

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "chinese-punctuation-to-english.toEnglish",
      replaceText
    )
  );
}

export function deactivate(): void {
  // Cleanup if needed
}
