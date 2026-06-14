import * as vscode from "vscode";
import {
  chineseToEnglishMap,
  chinesePunctuationRegex,
  englishToChineseMap,
  englishPunctuationRegex,
} from "./punctuation-map";

/**
 * Replace Chinese punctuation with English punctuation in text.
 * @param text - The input text containing Chinese punctuation.
 * @returns The text with Chinese punctuation replaced.
 */
export function replacePunctuationToEnglish(text: string): string {
  return text.replace(chinesePunctuationRegex, (match) => {
    return chineseToEnglishMap.get(match)!;
  });
}

/**
 * Replace English punctuation with Chinese punctuation in text.
 * @param text - The input text containing English punctuation.
 * @returns The text with English punctuation replaced.
 */
export function replacePunctuationToChinese(text: string): string {
  return text.replace(englishPunctuationRegex, (match) => {
    return englishToChineseMap.get(match)!;
  });
}

function replaceText(): void {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    return;
  }

  const text = editor.document.getText();
  const replacedText = replacePunctuationToEnglish(text);

  const startPosition = new vscode.Position(0, 0);
  const endPosition = new vscode.Position(editor.document.lineCount, 0);
  const range = new vscode.Range(startPosition, endPosition);
  editor.edit((builder) => {
    builder.replace(range, replacedText);
    vscode.window.showInformationMessage("成功替换标点符号为英文!");
  });
}

function replaceTextToChinese(): void {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    return;
  }

  const text = editor.document.getText();
  const replacedText = replacePunctuationToChinese(text);

  const startPosition = new vscode.Position(0, 0);
  const endPosition = new vscode.Position(editor.document.lineCount, 0);
  const range = new vscode.Range(startPosition, endPosition);
  editor.edit((builder) => {
    builder.replace(range, replacedText);
    vscode.window.showInformationMessage("成功替换标点符号为中文!");
  });
}

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "chinese-punctuation-to-english.toEnglish",
      replaceText
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "chinese-punctuation-to-english.toChinese",
      replaceTextToChinese
    )
  );

  // 保存时自动转换（默认关闭，需用户开启配置项 "autoConvertOnSave"）
  context.subscriptions.push(
    vscode.workspace.onWillSaveTextDocument((event) => {
      const config = vscode.workspace.getConfiguration(
        "chinese-punctuation-to-english"
      );
      if (!config.get<boolean>("autoConvertOnSave", false)) {
        return;
      }

      const document = event.document;
      const text = document.getText();
      const replaced = replacePunctuationToEnglish(text);

      if (text === replaced) {
        return;
      }

      const fullRange = new vscode.Range(
        document.positionAt(0),
        document.positionAt(text.length)
      );

      event.waitUntil(Promise.resolve([vscode.TextEdit.replace(fullRange, replaced)]));
    })
  );
}

export function deactivate(): void {
  // Cleanup if needed
}
