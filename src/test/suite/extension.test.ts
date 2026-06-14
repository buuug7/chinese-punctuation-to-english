import * as assert from "assert";
import {
  replacePunctuationToEnglish,
  replacePunctuationToChinese,
} from "../../extension";

suite("replacePunctuationToEnglish", () => {
  test("replaces Chinese comma with English comma", () => {
    assert.strictEqual(replacePunctuationToEnglish("，"), ",");
  });

  test("replaces Chinese period with English period", () => {
    assert.strictEqual(replacePunctuationToEnglish("。"), ".");
  });

  test("replaces Chinese question mark with English question mark", () => {
    assert.strictEqual(replacePunctuationToEnglish("？"), "?");
  });

  test("replaces Chinese enumeration comma with English comma", () => {
    assert.strictEqual(replacePunctuationToEnglish("、"), ",");
  });

  test("replaces Chinese colon with English colon", () => {
    assert.strictEqual(replacePunctuationToEnglish("："), ":");
  });

  test("replaces Chinese semicolon with English semicolon", () => {
    assert.strictEqual(replacePunctuationToEnglish("；"), ";");
  });

  test("replaces Chinese exclamation mark with English exclamation mark", () => {
    assert.strictEqual(replacePunctuationToEnglish("！"), "!");
  });

  test("replaces Chinese double quotes with English double quotes", () => {
    assert.strictEqual(replacePunctuationToEnglish("“Hello”"), '"Hello"');
  });

  test("replaces Chinese single quotes with English single quotes", () => {
    assert.strictEqual(replacePunctuationToEnglish("‘Hello’"), "'Hello'");
  });

  test("replaces Chinese parentheses with English parentheses", () => {
    assert.strictEqual(replacePunctuationToEnglish("（test）"), "(test)");
  });

  test("replaces Chinese curly braces with English curly braces", () => {
    assert.strictEqual(replacePunctuationToEnglish("｛test｝"), "{test}");
  });

  test("replaces Chinese angle brackets with English angle brackets", () => {
    assert.strictEqual(replacePunctuationToEnglish("《test》"), "<test>");
  });

  test("replaces Chinese square brackets with English square brackets", () => {
    assert.strictEqual(replacePunctuationToEnglish("【test】"), "[test]");
  });

  test("handles mixed text with multiple Chinese punctuation", () => {
    const input = "你好，世界！今天天气怎么样？";
    const expected = "你好,世界!今天天气怎么样?";
    assert.strictEqual(replacePunctuationToEnglish(input), expected);
  });

  test("returns empty string unchanged", () => {
    assert.strictEqual(replacePunctuationToEnglish(""), "");
  });

  test("returns text without Chinese punctuation unchanged", () => {
    assert.strictEqual(replacePunctuationToEnglish("Hello, world!"), "Hello, world!");
  });

  test("returns text with only English punctuation unchanged", () => {
    assert.strictEqual(
      replacePunctuationToEnglish("test (with) [some] {punctuation}"),
      "test (with) [some] {punctuation}"
    );
  });

  test("handles null bytes gracefully", () => {
    assert.strictEqual(replacePunctuationToEnglish("\0"), "\0");
  });

  test("handles multiline text", () => {
    const input = "第一行。\n第二行！";
    const expected = "第一行.\n第二行!";
    assert.strictEqual(replacePunctuationToEnglish(input), expected);
  });
});

suite("replacePunctuationToChinese", () => {
  test("replaces English comma with Chinese comma", () => {
    assert.strictEqual(replacePunctuationToChinese(","), "，");
  });

  test("replaces English period with Chinese period", () => {
    assert.strictEqual(replacePunctuationToChinese("."), "。");
  });

  test("replaces English question mark with Chinese question mark", () => {
    assert.strictEqual(replacePunctuationToChinese("?"), "？");
  });

  test("replaces English colon with Chinese colon", () => {
    assert.strictEqual(replacePunctuationToChinese(":"), "：");
  });

  test("replaces English semicolon with Chinese semicolon", () => {
    assert.strictEqual(replacePunctuationToChinese(";"), "；");
  });

  test("replaces English exclamation mark with Chinese exclamation mark", () => {
    assert.strictEqual(replacePunctuationToChinese("!"), "！");
  });

  test("replaces English double quotes with Chinese double quotes", () => {
    // ASCII " maps to U+201C (LEFT DOUBLE QUOTATION MARK) via first-wins derivation
    assert.strictEqual(
      replacePunctuationToChinese('"Hello"'),
      "“Hello“"
    );
  });

  test("replaces English single quotes with Chinese single quotes", () => {
    // ASCII ' maps to U+2018 (LEFT SINGLE QUOTATION MARK) via first-wins derivation
    assert.strictEqual(
      replacePunctuationToChinese("'Hello'"),
      "‘Hello‘"
    );
  });

  test("replaces English double quotes in mixed text", () => {
    const input = 'He said "hello" to me';
    const expected = "He said “hello“ to me";
    assert.strictEqual(replacePunctuationToChinese(input), expected);
  });

  test("replaces English parentheses with Chinese parentheses", () => {
    assert.strictEqual(replacePunctuationToChinese("(test)"), "（test）");
  });

  test("replaces English square brackets with Chinese square brackets", () => {
    assert.strictEqual(replacePunctuationToChinese("[test]"), "【test】");
  });

  test("handles mixed text with multiple English punctuation", () => {
    const input = "Hello, world! How are you?";
    const expected = "Hello， world！ How are you？";
    assert.strictEqual(replacePunctuationToChinese(input), expected);
  });

  test("returns empty string unchanged", () => {
    assert.strictEqual(replacePunctuationToChinese(""), "");
  });

  test("returns text without English punctuation unchanged", () => {
    assert.strictEqual(
      replacePunctuationToChinese("你好 世界"),
      "你好 世界"
    );
  });

  test("returns text with only Chinese punctuation unchanged", () => {
    assert.strictEqual(
      replacePunctuationToChinese("你好，世界！"),
      "你好，世界！"
    );
  });

  test("handles multiline text", () => {
    const input = "Line 1.\nLine 2!";
    const expected = "Line 1。\nLine 2！";
    assert.strictEqual(replacePunctuationToChinese(input), expected);
  });

  test("replaces curly braces", () => {
    assert.strictEqual(replacePunctuationToChinese("{test}"), "｛test｝");
  });

  test("replaces angle brackets", () => {
    assert.strictEqual(replacePunctuationToChinese("<test>"), "＜test＞");
  });
});
