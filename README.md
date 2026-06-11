# Chinese Punctuation To English

中文标点符号一键转换为英文的 VS Code 扩展。

## 功能

一键将当前文档中的所有中文标点符号替换为英文标点。

**支持转换的标点符号:**

| 中文      | →   | 英文    |
| --------- | --- | ------- |
| `，` `、` | →   | `,`     |
| `。`      | →   | `.`     |
| `？`      | →   | `?`     |
| `：`      | →   | `:`     |
| `；`      | →   | `;`     |
| `！`      | →   | `!`     |
| `“` `”`   | →   | `"`     |
| `‘` `’`   | →   | `'`     |
| `（` `）` | →   | `(` `)` |
| `｛` `｝` | →   | `{` `}` |
| `《` `》` | →   | `<` `>` |
| `【` `】` | →   | `[` `]` |

---

## 使用方法

### 右键菜单

1. 在编辑器中右键单击
2. 选择 **To English Punctuation**

### 命令面板

1. 打开包含中文标点的文件
2. 按 `Ctrl+Shift+P`（macOS 按 `Cmd+Shift+P`）打开命令面板
3. 输入 **To English Punctuation** 并执行

整个文档的中文标点会被立即替换，替换完成后会弹出提示消息。

## 安装

1. 打开 **扩展** 视图（`Ctrl+Shift+X`）
2. 搜索 `Chinese Punctuation to English`
3. 点击 **安装**

或直接访问 [VS Code 市场页面](https://marketplace.visualstudio.com/items?itemName=buuug7.chinese-punctuation-to-english) 安装。

## 参与贡献

欢迎提交 [issue](https://github.com/buuug7/chinese-punctuation-to-english-vsocode/issues) 或 pull request。

标点符号映射定义在 [`src/punctuation-map.ts`](src/punctuation-map.ts)，如需增加新的字符映射，只需在 Map 中添加一行即可。

## 许可证

[MIT](LICENSE)
