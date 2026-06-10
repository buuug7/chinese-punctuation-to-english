import * as assert from "assert";
import { replacePunctuation } from "../../extension";

suite("replacePunctuation", () => {
  test("replaces Chinese comma with English comma", () => {
    assert.strictEqual(replacePunctuation("，"), ",");
  });

  test("replaces Chinese period with English period", () => {
    assert.strictEqual(replacePunctuation("。"), ".");
  });

  test("replaces Chinese question mark with English question mark", () => {
    assert.strictEqual(replacePunctuation("？"), "?");
  });

  test("replaces Chinese enumeration comma with English comma", () => {
    assert.strictEqual(replacePunctuation("、"), ",");
  });

  test("replaces Chinese colon with English colon", () => {
    assert.strictEqual(replacePunctuation("："), ":");
  });

  test("replaces Chinese semicolon with English semicolon", () => {
    assert.strictEqual(replacePunctuation("；"), ";");
  });

  test("replaces Chinese exclamation mark with English exclamation mark", () => {
    assert.strictEqual(replacePunctuation("！"), "!");
  });

  test("replaces Chinese double quotes with English double quotes", () => {
    assert.strictEqual(replacePunctuation("“Hello”"), '"Hello"');
  });

  test("replaces Chinese single quotes with English single quotes", () => {
    assert.strictEqual(replacePunctuation("‘Hello’"), "'Hello'");
  });

  test("replaces Chinese parentheses with English parentheses", () => {
    assert.strictEqual(replacePunctuation("（test）"), "(test)");
  });

  test("replaces Chinese curly braces with English curly braces", () => {
    assert.strictEqual(replacePunctuation("｛test｝"), "{test}");
  });

  test("replaces Chinese angle brackets with English angle brackets", () => {
    assert.strictEqual(replacePunctuation("《test》"), "<test>");
  });

  test("replaces Chinese square brackets with English square brackets", () => {
    assert.strictEqual(replacePunctuation("【test】"), "[test]");
  });

  test("handles mixed text with multiple Chinese punctuation", () => {
    const input = "你好，世界！今天天气怎么样？";
    const expected = "你好,世界!今天天气怎么样?";
    assert.strictEqual(replacePunctuation(input), expected);
  });

  test("returns empty string unchanged", () => {
    assert.strictEqual(replacePunctuation(""), "");
  });

  test("returns text without Chinese punctuation unchanged", () => {
    assert.strictEqual(replacePunctuation("Hello, world!"), "Hello, world!");
  });

  test("returns text with only English punctuation unchanged", () => {
    assert.strictEqual(
      replacePunctuation("test (with) [some] {punctuation}"),
      "test (with) [some] {punctuation}"
    );
  });

  test("handles null bytes gracefully", () => {
    assert.strictEqual(replacePunctuation("\0"), "\0");
  });

  test("handles multiline text", () => {
    const input = "第一行。\n第二行！";
    const expected = "第一行.\n第二行!";
    assert.strictEqual(replacePunctuation(input), expected);
  });
});
