# Chinese Punctuation To English

在 VS Code 中一键完成中文标点符号（包括全角符号）与英文标点符号之间的**双向转换**，告别手动修改标点的繁琐操作。

无论是撰写英文文档时忘记切换输入法，还是处理包含大量中文标点的文本，只需一个命令或一次右键点击，即可快速完成整个文档的标点符号转换。

## 功能

在当前文档中一键执行以下操作：

- **中文标点 → 英文标点**：将所有中文标点符号（CJK 标点 + 全角 ASCII 符号）批量替换为对应的英文标点符号
- **英文标点 → 中文标点**：将所有英文标点符号批量替换为对应的中文标点符号（反向映射由正向映射自动推导）

**支持转换的标点符号:**

**CJK 标点符号**

| 中文 | → | 英文 | | 中文 | → | 英文 |
|------|---|---|---|------|---|---|
| `，` | → | `,` | | `、` | → | `,` |
| `。` | → | `.` | | `？` | → | `?` |
| `：` | → | `:` | | `；` | → | `;` |
| `！` | → | `!` | | `“` `”` | → | `"` |
| `‘` `’` | → | `'` | | `（` `）` | → | `(` `)` |
| `｛` `｝` | → | `{` `}` | | `《` `》` | → | `<` `>` |
| `〈` `〉` | → | `<` `>` | | `【` `】` | → | `[` `]` |
| `〔` `〕` | → | `[` `]` | | `〖` `〗` | → | `[` `]` |
| `「` `」` | → | `"` | | `『` `』` | → | `"` |

**全角 ASCII 符号**

| 全角 | → | 半角 | | 全角 | → | 半角 |
|------|---|---|---|------|---|---|
| `＂` | → | `"` | | `＇` | → | `'` |
| `－` | → | `-` | | `．` | → | `.` |
| `／` | → | `/` | | `～` | → | `~` |
| `＃` | → | `#` | | `＄` | → | `$` |
| `％` | → | `%` | | `＆` | → | `&` |
| `＊` | → | `*` | | `＠` | → | `@` |
| `＾` | → | `^` | | `＿` | → | `_` |
| `｀` | → | `` ` `` | | `｜` | → | `\|` |
| `＋` | → | `+` | | `＝` | → | `=` |
| `＜` | → | `<` | | `＞` | → | `>` |
| `＼` | → | `\` | | `［` `］` | → | `[` `]` |
| `｟` `｠` | → | `(` `)` | | | | |

> 共 **55 个**中文/全角标点符号可转换为英文等价物。
> 反向映射由正向映射自动推导（首次出现优先），两者始终保持同步，无需单独维护。

---

## 使用方法

### 右键菜单

1. 在编辑器中右键单击
2. 选择 **Punctuation To English** 或 **Punctuation To Chinese**

### 命令面板

1. 打开文件
2. 按 `Ctrl+Shift+P`（macOS 按 `Cmd+Shift+P`）打开命令面板
3. 输入 **Punctuation To English** 或 **Punctuation To Chinese** 并执行

整个文档的标点会被立即替换，替换完成后会弹出提示消息。

---

## 自动保存转换

扩展支持在保存文件时自动转换标点符号，需在 VS Code 设置中开启：

| 设置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `autoConvertOnSave` | `boolean` | `false` | 保存时自动替换标点符号 |
| `autoConvertTarget` | `"english"` / `"chinese"` | `"english"` | 自动替换的目标类型 |

### 示例

在 `settings.json` 中配置：

```json
{
  "chinese-punctuation-to-english.autoConvertOnSave": true,
  "chinese-punctuation-to-english.autoConvertTarget": "chinese"
}
```

也可在 VS Code 设置 UI 中搜索 `chinese-punctuation-to-english` 进行配置。

---

## 安装

1. 打开 **扩展** 视图（`Ctrl+Shift+X`）
2. 搜索 `Chinese Punctuation to English`
3. 点击 **安装**

或直接访问 [VS Code 市场页面](https://marketplace.visualstudio.com/items?itemName=buuug7.chinese-punctuation-to-english) 安装。

## 参与贡献

欢迎提交 [issue](https://github.com/buuug7/chinese-punctuation-to-english-vsocode/issues) 或 pull request。

标点符号映射定义在 [`src/punctuation-map.ts`](src/punctuation-map.ts)，如需增加新的字符映射，只需在 `chineseToEnglishMap` 中添加一行即可，反向映射会自动推导。

## 许可证

[MIT](LICENSE)
