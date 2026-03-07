import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
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

function yamlLine(key: string, value: string, indent = 0): string {
  return `${"  ".repeat(indent)}${key}: '${value}'`;
}

const themeName = "Blacksmith";

const yaml = [
  `name: ${themeName}`,
  yamlLine("accent", resolveColor("accent.1")),
  yamlLine("cursor", resolveColor("ui.cursor")),
  yamlLine("background", resolveColor("bg.0")),
  yamlLine("foreground", resolveColor("fg.0")),
  "details: darker",
  "terminal_colors:",
  "  normal:",
  yamlLine("black", resolveColor("bg.1"), 2),
  yamlLine("red", resolveColor("status.error"), 2),
  yamlLine("green", resolveColor("status.success"), 2),
  yamlLine("yellow", resolveColor("accent.2"), 2),
  yamlLine("blue", resolveColor("syntax.keyword"), 2),
  yamlLine("magenta", resolveColor("terminal.ansi.magenta"), 2),
  yamlLine("cyan", resolveColor("terminal.ansi.cyan"), 2),
  yamlLine("white", resolveColor("fg.1"), 2),
  "  bright:",
  yamlLine("black", resolveColor("fg.3"), 2),
  yamlLine("red", resolveColor("terminal.ansi.bright_red"), 2),
  yamlLine("green", resolveColor("terminal.ansi.bright_green"), 2),
  yamlLine("yellow", resolveColor("terminal.ansi.bright_yellow"), 2),
  yamlLine("blue", resolveColor("terminal.ansi.bright_blue"), 2),
  yamlLine("magenta", resolveColor("terminal.ansi.bright_magenta"), 2),
  yamlLine("cyan", resolveColor("terminal.ansi.bright_cyan"), 2),
  yamlLine("white", resolveColor("terminal.bright_foreground"), 2),
].join("\n");

const outputUrl = new URL("../dist/warp/blacksmith.yaml", import.meta.url);
mkdirSync(dirname(fileURLToPath(outputUrl)), { recursive: true });
await Bun.write(outputUrl, `${yaml}\n`);

console.log(`Wrote ${fileURLToPath(outputUrl)}`);
