# 中文标点符号替换为英文 (Chinese punctuation to english for vscode)

将中文标点符号替换为英文的 vscode 扩展.

A vscode extension of converting Chinese punctuation to English.

<p>
    <a href="https://marketplace.visualstudio.com/items?itemName=buuug7.chinese-punctuation-to-english">
        <img src="https://vsmarketplacebadge.apphb.com/version-short/buuug7.chinese-punctuation-to-english.svg" alt="version">
    </a>
    <a href="https://marketplace.visualstudio.com/items?itemName=buuug7.chinese-punctuation-to-english">
        <img src="https://vsmarketplacebadge.apphb.com/installs-short/buuug7.chinese-punctuation-to-english.svg" alt="installs">
    </a>
    <a href="https://marketplace.visualstudio.com/items?itemName=buuug7.chinese-punctuation-to-english">
        <img src="https://vsmarketplacebadge.apphb.com/rating-short/buuug7.chinese-punctuation-to-english.svg" alt="rating">
    </a>
</p>

## Usage

Use the **To English Punctuation** command from the Command palette or the context of editor menu to convert it.

在命令面板中使用**To English Punctuation**命令或者在编辑器上下文菜单来转换标点符号. 当前只支持以下标点符号中英文的映射:

```javascript
[
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

  // 方括号
  ["【", "["],
  ["】", "]"],
];
```

## contribution

If you're interested in contributing to, fork the [repo](https://github.com/buuug7/chinese-punctuation-to-english-vsocode.git) and submit pull requests.

## other links

- [git-repository](https://github.com/buuug7/chinese-punctuation-to-english-vsocode.git)
- [publishing-extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
