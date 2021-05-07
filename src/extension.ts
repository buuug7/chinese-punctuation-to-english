import * as vscode from "vscode";

const chineseToEnglishMap = new Map([
  // 逗号
  ["，", ", "],

  // 句号
  ["。", ". "],

  // 问号
  ["？", "?"],

  // 顿号
  ["、", ", "],

  //冒号
  ["：", ": "],

  // 分好
  ["；", "; "],

  // 感叹号
  ["！", "!"],

  // 双引号
  ["“", '"'],
  ["”", '"'],

  // 单引号
  ["‘", "'"],
  ["’", "'"],

  // 圆括号
  ["（", "("],
  ["）", ")"],

  // 花括号
  ["｛", "{"],
  ["｝", "}"],

  // 尖括号
  ["《", "<"],
  ["》", ">"],
]);

function replacePunctuation(text: string) {
  let _text = text;
  for (const [k, v] of chineseToEnglishMap) {
    _text = _text.replace(new RegExp(k, "gu"), v);
  }
  return _text;
}

function replaceText() {
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
    vscode.window.showInformationMessage(
      "Successfully change the chinese punctuation to english!"
    );
  });
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "chinese-punctuation-to-english.toEnglish",
      () => {
        replaceText();
      }
    )
  );
}

export function deactivate() {}
