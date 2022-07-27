import * as vscode from "vscode";

const chineseToEnglishMap = new Map([
  // 逗号
  ["，", ","],

  // 句号
  ["。", "."],

  // 问号
  ["？", "?"],

  // 顿号
  ["、", ","],

  //冒号
  ["：", ":"],

  // 分好
  ["；", ";"],

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

  // 方括号
  ["【", "["],
  ["】", "]"],
]);

/**
 * replace chinese punctuation to english of text
 * @param text
 * @returns
 */
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
  let replacedText = replacePunctuation(text);

  const startPosition = new vscode.Position(0, 0);
  const endPosition = new vscode.Position(editor.document.lineCount, 0);
  const range = new vscode.Range(startPosition, endPosition);
  editor.edit((builder) => {
    builder.replace(range, replacedText);
    vscode.window.showInformationMessage("成功替换标点符号为英文!");
  });
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "chinese-punctuation-to-english.toEnglish",
      replaceText
    )
  );
}

function isEmptyOrWhitespace(text: string | null) {
  if (text === null) {
    return true;
  }
  return /^(\s*)/.exec(text)![1].length === text.length;
}

export function deactivate() {}
