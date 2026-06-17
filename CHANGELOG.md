# Change Log

# 2.2.0 - 2026/06/17

- ✨ 英文→中文映射改为手动维护，排除纯全角 ASCII 符号（`#` `*` `` ` `` 等），避免破坏 Markdown 语法
- ✨ 新增 SkipRule 上下文保护规则：
  - 小数点/文件扩展名/版本号保护（`2.3` `file.md` `v3.2`）
  - Markdown 有序列表保护（`1. item` `## 2. 标题`）
  - Markdown 块引用保护（`> quote`）
  - Markdown 链接保护（`[text](url)`）
- 🔒 代码块保护：行内代码（`` `code` ``）和围栏代码块（`` ``` ``` ``）中的标点不被替换
- ✨ 新增省略号映射（`…` ↔ `...`）
- ✨ 新增破折号映射（`—` ↔ `--`）
- ♻️ 重构 `replacePunctuationToChinese`，支持可组合的 SkipRule
- 📝 更新 README 和 CLAUDE.md，补充 SkipRule 和代码块保护说明

- 🎯 优化 package.json 关键词，移除过长短语，增加更短的搜索词
- 🐛 更新修复 README 错误的标点符号描述

# 2.1.0 - 2026/06/14

- 🔒 自动保存替换改用语言白名单机制，默认仅允许 `plaintext`(纯文本) 和 `markdown` 文件，防止破坏配置文件、代码等标点敏感的文件格式
- 🗑️ 移除 `autoConvertExcludePatterns` 黑名单配置项，替换为 `autoConvertLanguageWhitelist` 白名单配置项
- 📝 更新 README，详细说明为什么使用语言白名单而非文件路径黑名单

# 2.0.0 - 2026/06/14

- ✨ 新增反向转换:英文标点符号 → 中文标点符号,支持命令面板和右键菜单
- ✨ 扩展标点符号映射至 54 个(29 个 CJK + 25 个全角 ASCII)
- ✨ 新增 `autoConvertTarget` 配置项,可控制保存时自动转换的方向(英文/中文)
- ✅ 新增完整测试覆盖:正向 14 个 + 逆向 16 个测试用例
- 📝 更新文档,增加反向映射表并修正符号数量统计

# 1.2.2 - 2026/06/13

- chore: normalize title/display name capitalization
- update icon

# 1.2.1 - 2026/06/10

- update icon

# 1.2.0 - 2026/06/10

- feat: add auto-convert on save feature with config toggle (`chinese-punctuation-to-english.autoConvertOnSave`)
- chore: modernize project — upgrade deps, refactor code, add test suite
- chore: rewrite README with feature table, usage guide, and contributing section
- chore: move icon assets to media/ directory

# 1.1.0 - 2022/07/27

- add '【】' punctuation for converting
- remove `format txt` command

# 1.0.0 - 2021/10/19

- remove the extra behavior of add one blank after replace punctuations
- remove `format txt` command

## 0.3.0 - 2021/06/29

- add a new command to format txt files(when line character length great than 50, add `\n`)

## 0.3.0 - 2021/06/29

- adds one blank after each of `, . ? : ; !` punctuations for the better format

## 0.0.5 - 2021/05/07

- update icon and README.md
- add LICENSE
