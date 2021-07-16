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

/**
 * format punctuation of english
 * @param text
 * @returns
 */
function formatPunctuation(text: string) {
  let _text = text;
  for (const v of chineseToEnglishMap.values()) {
    _text = formatByRule(v, _text);
  }

  return _text;
}

function formatByRule(p: string, text: string) {
  switch (p) {
    case ".":
      return text.replace(
        new RegExp(`(?<![\\w\\s\\.])(\\${p})(?!\\s+)`, "g"),
        "$1 "
      );
    case ",":
    case "?":
    case ":":
    case ";":
    case "!":
      return text.replace(
        new RegExp(`(?<![\\s\\.])(\\${p})(?!\\s+|/)`, "g"),
        "$1 "
      );
    default:
      return text;
  }
}

function replaceText() {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    return;
  }

  const text = editor.document.getText();
  let replacedText = replacePunctuation(text);
  replacedText = formatPunctuation(replacedText);

  const startPosition = new vscode.Position(0, 0);
  const endPosition = new vscode.Position(editor.document.lineCount, 0);
  const range = new vscode.Range(startPosition, endPosition);
  editor.edit((builder) => {
    builder.replace(range, replacedText);
    vscode.window.showInformationMessage("成功替换中文标点符号为英文!");
  });
}

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "chinese-punctuation-to-english.toEnglish",
      replaceText
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "chinese-punctuation-to-english.formatTxt",
      formatWithProgress
    )
  );
}

async function formatText(
  clickedFile: any,
  selectedFiles: any,
  progress?: any
) {
  const editor = vscode.window.activeTextEditor;
  const tasks = [];

  if (!selectedFiles && editor && editor.document.languageId === "plaintext") {
    tasks.push(doFormat(editor.document.getText(), editor.document.uri));
  }

  if (selectedFiles && selectedFiles.length) {
    for (let i = 0; i < selectedFiles.length; i++) {
      const item = selectedFiles[i];
      const uri = vscode.Uri.file(item.path);
      const file = await vscode.workspace.fs.readFile(uri);
      tasks.push(doFormat(file.toString(), uri, progress));
    }
  }

  return Promise.all(tasks);
}

async function doFormat(originText: string, uri: vscode.Uri, progress?: any) {
  let text = "";
  let textArr = originText.split("\n");
  let newLineCount = 0;
  const lineCount = textArr.length;

  for (let index = 0; index < textArr.length; index++) {
    const lineText = textArr[index].trim();
    const preLine = index - 1 < 0 ? null : textArr[index - 1];

    // text length greater than 50 and pre line is not empty line
    if (lineText.length > 50 && !isEmptyOrWhitespace(preLine)) {
      text += "\n" + lineText + "\n";
      newLineCount += 1;
    } else {
      text += lineText + "\n";
    }
  }

  text = text.trim();

  // [\u7b2c] 第
  // [\u56de] 回
  // 匹配 第xx回
  text = text.replace(/([\u7b2c].{1,4}[\u56de])(?!\s)/giu, "$1 ");
  const rs = await vscode.workspace.fs.writeFile(uri, Buffer.from(text));
  progress.report({ message: `${uri.path.split("/").pop()}` });
  return rs;
}

function isEmptyOrWhitespace(text: string | null) {
  if (text === null) {
    return true;
  }
  return /^(\s*)/.exec(text)![1].length === text.length;
}

function formatWithProgress(clickedFile: any, selectedFiles: any) {
  vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Window,
      cancellable: false,
      title: "Format",
    },
    async (progress) => {
      progress.report({ message: "start format..." });
      await formatText(clickedFile, selectedFiles, progress);
    }
  );
}

export function deactivate() {}
