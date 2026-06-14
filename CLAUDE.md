# Chinese Punctuation to English — VS Code Extension

## Project Overview

A VS Code extension that converts Chinese punctuation to English equivalents **and** English punctuation to Chinese equivalents in the active editor. Registered as `buuug7.chinese-punctuation-to-english` on the marketplace.

**Stack:** TypeScript 4.x, VS Code API ^1.56, Node.js 12.x  
**Entry:** `src/extension.ts` → compiled to `out/extension.js`

---

## Build & Test Commands

| Command | Action |
|---|---|
| `npm run compile` | Compile TypeScript (`tsc -p ./`) |
| `npm run watch` | Watch mode (`tsc -watch -p ./`) |
| `npm run lint` | ESLint on `src/` directory |
| `npm test` | Compile + lint + run Mocha tests |
| `npm run vscode:prepublish` | Pre-publish compile (run automatically by `vsce`) |
| `npx vsce package` | Package `.vsix` for distribution |

---

## Architecture

### Activation

- **Event:** `onStartupFinished` — extension loads once VS Code is fully ready (no lazy activation).

### Commands

| ID | Title | Category |
|---|---|---|
| `chinese-punctuation-to-english.toEnglish` | Punctuation To English | Chinese-punctuation-to-english |
| `chinese-punctuation-to-english.toChinese` | Punctuation To Chinese | Chinese-punctuation-to-english |

- **Triggered from:** Command Palette or editor right-click context menu

### Core Logic (`src/extension.ts`)

1. **`chineseToEnglishMap`** (`src/punctuation-map.ts`) — A `Map<string, string>` holding 55 Chinese→English punctuation pairs covering:
   - **CJK punctuation** (28 pairs): `，。？、：；！"＂'‘（）｛｝《》〈〉【】〔〕〖〗「」『』` → ASCII equivalents
   - **Fullwidth ASCII** (27 pairs): `＂＇－．／～＃＄％＆＊＠＾＿｀｜＋＝＜＞＼［］｟｠` → ASCII equivalents
2. **`englishToChineseMap`** — Dynamically built from `chineseToEnglishMap` (first-wins for many-to-one mappings), keeping both directions in sync without a separately maintained reverse map.
3. **`chinesePunctuationRegex`** / **`englishPunctuationRegex`** — Single regex built once per direction for efficient global replacement.
4. **`replacePunctuationToEnglish(text)`** — Replaces Chinese punctuation with English using the forward map + regex.
5. **`replacePunctuationToChinese(text)`** — Replaces English punctuation with Chinese using the reverse map + regex.
6. **`replaceText()` / `replaceTextToChinese()`** — Gets active editor text, runs the appropriate conversion over the full document range, applies via `editor.edit()`, and shows a result message.
7. **`activate()`** — Registers both command subscriptions and the auto-save handler.
8. **Auto-save** — Listens to `onWillSaveTextDocument`; reads `autoConvertOnSave` (boolean, default false) and `autoConvertTarget` (`"english"` or `"chinese"`, default `"english"`) config to decide whether and in which direction to convert on save.

### Key Design Choices

- Operates on the **entire document** (not selection-based).
- Uses `Map` instead of a plain object — deterministic iteration order.
- Reverse mapping is **derived dynamically** from the forward map — no separate map to maintain.
- `RegExp` with `gu` flags ensures global Unicode-aware replacement.
- `onStartupFinished` activation means the command is always available without first-use delay.

---

## Testing

- **Framework:** Mocha + `vscode-test`
- **Location:** `src/test/suite/extension.test.ts`
- **Run:** `npm test` (launches a VS Code extension host test runner)
- Two test suites:
  - `replacePunctuationToEnglish` — covers all Chinese→English mapping pairs and edge cases
  - `replacePunctuationToChinese` — covers all English→Chinese mapping pairs and edge cases

---

## Debugging

Use the **"Run Extension"** launch config in `.vscode/launch.json`:
- Opens a new VS Code Extension Development Host window.
- Pre-launch task compiles TypeScript.
- Use **"Extension Tests"** to run tests in the debugger.

---

## Publishing

The extension is published via `vsce`. Key files for publishing:
- `.vscodeignore` — excludes source maps, `.ts` files, config, and dev files from the packaged extension.
- `icon.png` — marketplace icon.
- Version is managed in `package.json`.

---

## Code Style Guidelines

- **Language:** TypeScript with strict mode enabled.
- **Indentation:** tabs (as seen in `.eslintrc.json` and `tsconfig.json`).
- **Semicolons:** required (`@typescript-eslint/semi: warn`).
- **Naming conventions:** `@typescript-eslint/naming-convention: warn`.
- **Equality:** use `===` / `!==` (`eqeqeq: warn`).
- **No `throw` of non-Error literals** (`no-throw-literal: warn`).
- **No unused variables:** opt-in check — currently `noUnusedParameters` is commented out in `tsconfig.json`.
- Avoid adding side effects beyond the explicit command; the extension replaces text and shows a single info message.
