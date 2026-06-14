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

/**
 * Build the English→Chinese reverse map from the forward map.
 *
 * Since multiple Chinese punctuation can map to the same English character
 * (e.g. "，"→"," and "、”→","), the first occurrence in map order wins.
 * This keeps the two directions in sync without maintaining a separate map.
 */
function buildEnglishToChineseMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const [chinese, english] of chineseToEnglishMap) {
    if (!map.has(english)) {
      map.set(english, chinese);
    }
  }
  return map;
}

export const englishToChineseMap = buildEnglishToChineseMap();

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
