# Chinese Punctuation To English

在 VS Code 中一键完成中文标点符号(包括全角符号)与英文标点符号之间的**双向转换**,告别手动修改标点的繁琐操作.

无论是撰写英文文档时忘记切换输入法,还是处理包含大量中文标点的文本,只需一个命令或一次右键点击,即可快速完成整个文档的标点符号转换.

## 安装

1. 打开 **扩展** 视图(`Ctrl+Shift+X`)
2. 搜索 `Chinese Punctuation to English`
3. 点击 **安装**

或直接访问 [VS Code 市场页面](https://marketplace.visualstudio.com/items?itemName=buuug7.chinese-punctuation-to-english) 安装.

## 使用方法

### 右键菜单

1. 在编辑器中右键单击
2. 选择 **Punctuation To English** 或 **Punctuation To Chinese**

### 命令面板

1. 打开文件
2. 按 `Ctrl+Shift+P`(macOS 按 `Cmd+Shift+P`)打开命令面板
3. 输入 **Punctuation To English** 或 **Punctuation To Chinese** 并执行

整个文档的标点会被立即替换,替换完成后会弹出提示消息.

## 功能

在当前文档中一键执行以下操作:

- **中文标点 → 英文标点**:将所有中文标点符号(CJK 标点 + 全角 ASCII 符号)批量替换为对应的英文标点符号
- **英文标点 → 中文标点**:将所有英文标点符号批量替换为对应的中文标点符号

**支持转换的标点符号:**

**CJK 标点符号**

| 中文      | →   | 英文    |     | 中文      | →   | 英文    |
| --------- | --- | ------- | --- | --------- | --- | ------- |
| `，`      | →   | `,`     |     | `、`      | →   | `,`     |
| `。`      | →   | `.`     |     | `？`      | →   | `?`     |
| `：`      | →   | `:`     |     | `；`      | →   | `;`     |
| `！`      | →   | `!`     |     | `"` `"`   | →   | `"`     |
| `'` `'`   | →   | `'`     |     | `（` `）` | →   | `(` `)` |
| `｛` `｝` | →   | `{` `}` |     | `《` `》` | →   | `<` `>` |
| `〈` `〉` | →   | `<` `>` |     | `【` `】` | →   | `[` `]` |
| `〔` `〕` | →   | `[` `]` |     | `〖` `〗` | →   | `[` `]` |
| `「` `」` | →   | `"`     |     | `『` `』` | →   | `"`     |
| `…`       | →   | `...`   |     | `—`       | →   | `--`    |

**全角 ASCII 符号**

| 全角      | →   | 半角    |     | 全角      | →   | 半角    |
| --------- | --- | ------- | --- | --------- | --- | ------- |
| `＂`      | →   | `"`     |     | `＇`      | →   | `'`     |
| `－`      | →   | `-`     |     | `．`      | →   | `.`     |
| `／`      | →   | `/`     |     | `～`      | →   | `~`     |
| `＃`      | →   | `#`     |     | `＄`      | →   | `$`     |
| `％`      | →   | `%`     |     | `＆`      | →   | `&`     |
| `＊`      | →   | `*`     |     | `＠`      | →   | `@`     |
| `＾`      | →   | `^`     |     | `＿`      | →   | `_`     |
| `｀`      | →   | `` ` `` |     | `｜`      | →   | `\|`    |
| `＋`      | →   | `+`     |     | `＝`      | →   | `=`     |
| `＜`      | →   | `<`     |     | `＞`      | →   | `>`     |
| `＼`      | →   | `\`     |     | `［` `］` | →   | `[` `]` |
| `｟` `｠` | →   | `(` `)` |     |           |     |         |

> 中文→英文方向共支持 **60 个**中文/全角标点符号转换为英文等价物.

### 反向映射(英文 → 中文)

反向映射为**手动维护**的独立表,只包含真正的中文标点,不包含纯全角 ASCII 符号(如 `#` → `＃` 等).这样做的好处是在 Markdown 文件中执行英文→中文转换时,`#` `*` `` ` `` 等语法符号不会被破坏.

| 英文    | →   | 中文         | 说明     |
| ------- | --- | ------------ | -------- |
| `,`     | →   | `，`         | 逗号     |
| `.`     | →   | `。`         | 句号     |
| `?`     | →   | `？`         | 问号     |
| `:`     | →   | `：`         | 冒号     |
| `;`     | →   | `；`         | 分号     |
| `!`     | →   | `！`         | 感叹号   |
| `"`     | →   | `"` (U+201C) | 左双引号 |
| `'`     | →   | `'` (U+2018) | 左单引号 |
| `(` `)` | →   | `（` `）`    | 圆括号   |
| `<` `>` | →   | `《` `》`    | 书名号   |
| `[` `]` | →   | `【` `】`    | 方括号   |
| `…`     | →   | `……`         | 省略号   |
| `—`     | →   | `——`         | 破折号   |

> 反向映射仅包含以上 **14 个**条目,不包含 `#` `*` `` ` `` `-` `/` `~` `$` `%` `&` `@` `^` `_` `|` `+` `=` `\` `{` `}` 等纯全角 ASCII 符号,避免在 Markdown 等格式文件中破坏语法.

### SkipRule 保护机制

英转中时,部分字符会根据上下文被跳过替换,避免破坏 Markdown 语法:

| 规则 | 保护场景 | 示例 | 文件类型 |
|------|---------|------|---------|
| `skipDecimalPoint` | 小数点 / 文件扩展名 / 版本号 | `2.3` `file.md` `v3.2` | 始终生效 |
| `skipOrderedList` | 有序列表 / 标题编号 | `1. item` `## 2. 标题` | Markdown |
| `skipBlockquote` | 块引用 | `> quote` `> > nested` | Markdown |
| `skipMarkdownLink` | 链接中的括号 | `[text](url)` | Markdown |
| `withProtectedCodeBlocks` | 行内代码和围栏代码块 | `` `printf("%d", a)` ``  `` ```json\n{"key": "val"}\n``` `` | Markdown |

## 自动保存转换

扩展支持在保存文件时自动转换标点符号,需在 VS Code 设置中开启:

| 设置项                         | 类型                      | 默认值                      | 说明                         |
| ------------------------------ | ------------------------- | --------------------------- | ---------------------------- |
| `autoConvertOnSave`            | `boolean`                 | `false`                     | 保存时自动替换标点符号       |
| `autoConvertTarget`            | `"english"` / `"chinese"` | `"english"`                 | 自动替换的目标类型           |
| `autoConvertLanguageWhitelist` | `string[]`                | `["plaintext", "markdown"]` | 允许自动替换的语言 ID 白名单 |

### 为什么使用语言白名单而非文件路径黑名单?

自动保存替换标点符号存在一个核心风险:许多文件格式对标点符号敏感,替换后可能被破坏.

例如:

- 全角 `=` → 半角 `=` 会破坏 YAML,INI,TOML 等配置文件的键值结构
- 全角 `#` → 半角 `#` 会破坏 Shell 脚本,Makefile,Python 等语言的注释语法
- 全角 `>` → 半角 `>` 会破坏 XML/HTML/SVG 的标签语法
- 全角 `"` → 半角 `"` 会破坏几乎所有编程语言的字符串语法

**最初方案(已弃用):文件路径黑名单**

我们曾尝试用 75 个 glob 模式来排除不应自动转换的文件(如 `**/*.json`,`**/*.yml`,`**/Dockerfile*` 等).但这种方式有根本性缺陷:

- **永远追不完** — 新的工具,语言,配置文件格式层出不穷,黑名单永远有遗漏
- **依赖文件名** — 同一份 `.json` 文件可能是配置(不应转换),也可能是纯文本数据(可以转换),黑名单无法区分
- **不准确** — `.gitignore` 和 `.env` 都是纯文本格式,但它们包含语法性符号,应该通过语言而非路径来判断

**最终方案:语言白名单**

利用 VS Code 内置的语言检测机制,**只对明确安全,标点无语法含义的文件类型**进行自动替换.

默认白名单:

- `plaintext`(纯文本)— `.txt` 等无语法含义的纯文本文件
- `markdown`(Markdown)— 虽然 Markdown 有少量格式符号,但其中文内容中的标点替换收益远大于风险

VS Code 的语言检测会自动判断文件类型,配置文件,代码文件,Dockerfile,脚本等都会被自动跳过,**无需手动维护任何排除列表**.

> 手动通过命令面板或右键菜单触发的转换不受白名单限制,始终对所有文件类型生效.

### 示例

在 `settings.json` 中配置:

```json
{
  "chinese-punctuation-to-english.autoConvertOnSave": true,
  "chinese-punctuation-to-english.autoConvertTarget": "chinese",
  "chinese-punctuation-to-english.autoConvertLanguageWhitelist": [
    "plaintext",
    "markdown",
    "latex"
  ]
}
```

也可在 VS Code 设置 UI 中搜索 `chinese-punctuation-to-english` 进行配置.如需对其他语言启用自动替换,只需在 `autoConvertLanguageWhitelist` 中添加对应的 [VS Code 语言 ID](https://code.visualstudio.com/docs/languages/overview),例如 `"latex"`,`"asciidoc"` 等.

## 参与贡献

欢迎提交 [issue](https://github.com/buuug7/chinese-punctuation-to-english-vsocode/issues) 或 pull request.

标点符号映射定义在 [`src/punctuation-map.ts`](src/punctuation-map.ts):

- **中文→英文**:在 `chineseToEnglishMap` 中添加条目
- **英文→中文**:在 `englishToChineseMap` 中手动添加条目(两个映射独立维护)

SkipRule 规则定义在 [`src/extension.ts`](src/extension.ts),如需新增保护规则:

1. 实现一个 `SkipRule` 函数(接收 `match, offset, fullText`,返回 `boolean`)
2. 放入 `markdownRules` 数组(Markdown 专用)或 `defaultRules`(始终生效)

## 许可证

[MIT](LICENSE)
