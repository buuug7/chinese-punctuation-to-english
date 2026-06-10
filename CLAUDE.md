# Chinese Punctuation to English — VS Code Extension

## Project Overview

A VS Code extension that converts Chinese punctuation marks to their English equivalents in the active editor. Registered as `buuug7.chinese-punctuation-to-english` on the marketplace.

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

### Command

- **ID:** `chinese-punctuation-to-english.toEnglish`
- **Title:** "To English Punctuation"
- **Category:** `Chinese-punctuation-to-english`
- **Triggered from:** Command Palette or editor right-click context menu

### Core Logic (`src/extension.ts`)

1. **`chineseToEnglishMap`** — A `Map<string, string>` holding 18 Chinese→English punctuation pairs:
   - `，。？、：；！"＂'‘（）｛｝《》【】` mapped to `, . ? , : ; ! " " ' ' ( ) { } < > [ ]`
2. **`replacePunctuation(text)`** — Iterates the map and uses `RegExp(k, "gu")` to replace all occurrences globally.
3. **`replaceText()`** — Gets text from the active editor, replaces all punctuation in the full document range, and applies the edit via `editor.edit()`. Shows an information message on success.
4. **`activate()`** — Registers the command subscription.

### Key Design Choices

- Operates on the **entire document** (not selection-based).
- Uses `Map` instead of a plain object — deterministic iteration order.
- `RegExp` with `gu` flags ensures global Unicode-aware replacement.
- `onStartupFinished` activation means the command is always available without first-use delay.

---

## Testing

- **Framework:** Mocha + `vscode-test`
- **Location:** `src/test/suite/extension.test.ts`
- **Run:** `npm test` (launches a VS Code extension host test runner)
- Tests currently contain a single sample test — add test cases for `replacePunctuation()` by importing the function.

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
