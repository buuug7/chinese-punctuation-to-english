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
 * A single regex matching any Chinese punctuation character.
 * Built once for efficient global replacement.
 */
export const chinesePunctuationRegex = new RegExp(
  `[${[...chineseToEnglishMap.keys()].join("")}]`,
  "gu"
);
