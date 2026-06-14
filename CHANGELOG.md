# Change Log

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
