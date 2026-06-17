/**
 * Mapping from Chinese punctuation to their English equivalents.
 */
export const chineseToEnglishMap = new Map<string, string>([
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

  // 分号
  ["；", ";"],

  // 感叹号
  ["！", "!"],

  // 省略号
  ["…", "..."],

  // 破折号
  ["—", "--"],

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

  // 单书名号（《》 的内层嵌套）
  ["〈", "<"],
  ["〉", ">"],

  // 直角引号（常出现在港台繁体中文中）
  ["「", '"'],
  ["」", '"'],

  // 白直角引号（「」 的内层嵌套）
  ["『", '"'],
  ["』", '"'],

  // 龟甲括号（用于标注文献年份、注释编号）
  ["〔", "["],
  ["〕", "]"],

  // 空心方括号（用于备注说明）
  ["〖", "["],
  ["〗", "]"],

  // 全角双引号
  ["＂", '"'],

  // 全角撇号
  ["＇", "'"],

  // 全角连字符
  ["－", "-"],

  // 全角句点
  ["．", "."],

  // 全角斜线
  ["／", "/"],

  // 全角波浪号
  ["～", "~"],

  // 全角井号
  ["＃", "#"],

  // 全角美元符号
  ["＄", "$"],

  // 全角百分号
  ["％", "%"],

  // 全角 and 符号
  ["＆", "&"],

  // 全角星号
  ["＊", "*"],

  // 全角 at 符号
  ["＠", "@"],

  // 全角脱字符
  ["＾", "^"],

  // 全角下划线
  ["＿", "_"],

  // 全角反引号
  ["｀", "`"],

  // 全角竖线
  ["｜", "|"],

  // 全角加号
  ["＋", "+"],

  // 全角等号
  ["＝", "="],

  // 全角小于号（区别于书名号《》）
  ["＜", "<"],

  // 全角大于号（区别于书名号《》）
  ["＞", ">"],

  // 全角反斜线
  ["＼", "\\"],

  // 全角左方括号（区别于 CJK 【 和 〖）
  ["［", "["],

  // 全角右方括号（区别于 CJK 】 和 〗）
  ["］", "]"],

  // 全角白括号
  ["｟", "("],
  ["｠", ")"],
]);

/**
 * A single regex matching any Chinese punctuation character.
 * Built once for efficient global replacement.
 */
export const chinesePunctuationRegex = new RegExp(
  `[${[...chineseToEnglishMap.keys()].join("")}]`,
  "gu"
);

/**
 * 英文符号 → 中文标点的映射表。
 *
 * 注意：这是一个手动维护的映射，只包含真正的中文标点，
 * 不包含纯全角 ASCII 符号（＃＄％＊等），避免破坏 Markdown 语法。
 */
export const englishToChineseMap = new Map<string, string>([
  // 逗号
  [",", "，"],

  // 句号
  [".", "。"],

  // 问号
  ["?", "？"],

  // 冒号
  [":", "："],

  // 分号
  [";", "；"],

  // 感叹号
  ["!", "！"],

  // 省略号
  ["…", "……"],

  // 破折号
  ["—", "——"],

  // 双引号
  ['"', "“"],

  // 单引号
  ["'", "‘"],

  // 圆括号
  ["(", "（"],
  [")", "）"],

  // 尖括号
  ["<", "《"],
  [">", "》"],

  // 方括号
  ["[", "【"],
  ["]", "】"],
]);

/**
 * A single regex matching any English punctuation character that has a Chinese
 * equivalent. Built once for efficient global replacement.
 *
 * Characters that are special inside a character class (], \, ^, -) are
 * escaped to keep the regex valid.
 */
export const englishPunctuationRegex = new RegExp(
  `[${[...englishToChineseMap.keys()]
    .map((k) => k.replace(/[\]\\^-]/g, "\\$&"))
    .join("")}]`,
  "gu"
);

