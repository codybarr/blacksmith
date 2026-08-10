import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { TOKENS } from "../src/tokens";

function resolveColor(value: string): string {
  if (value.startsWith("#")) return value.toUpperCase();
  const tokenColor = TOKENS.colors[value as keyof typeof TOKENS.colors];
  if (!tokenColor) {
    throw new Error(`Unknown color reference: ${value}`);
  }
  return tokenColor.toUpperCase();
}

const palette = [
  "bg.1",
  "status.error",
  "status.success",
  "status.warning",
  "syntax.keyword",
  "terminal.ansi.magenta",
  "terminal.ansi.cyan",
  "fg.1",
  "fg.3",
  "terminal.ansi.bright_red",
  "terminal.ansi.bright_green",
  "terminal.ansi.bright_yellow",
  "terminal.ansi.bright_blue",
  "terminal.ansi.bright_magenta",
  "terminal.ansi.bright_cyan",
  "terminal.bright_foreground",
];

const theme = [
  ...palette.map((color, index) => `palette = ${index}=${resolveColor(color)}`),
  `background = ${resolveColor("bg.0")}`,
  `foreground = ${resolveColor("fg.0")}`,
  `cursor-color = ${resolveColor("ui.cursor")}`,
  `cursor-text = ${resolveColor("ui.selection.foreground")}`,
  `selection-background = ${resolveColor("ui.selection.background.terminal")}`,
  `selection-foreground = ${resolveColor("ui.selection.foreground")}`,
].join("\n");

const outputPath = join(fileURLToPath(new URL("../dist/ghostty/", import.meta.url)), TOKENS.name);
mkdirSync(dirname(outputPath), { recursive: true });
await Bun.write(outputPath, `${theme}\n`);

console.log(`Wrote ${outputPath}`);
