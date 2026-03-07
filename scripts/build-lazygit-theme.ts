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

function yamlList(key: string, values: string[], indent = 0): string[] {
  return [
    `${"  ".repeat(indent)}${key}:`,
    ...values.map((value) => `${"  ".repeat(indent + 1)}- '${value}'`),
  ];
}

const yaml = [
  "gui:",
  "  authorColors:",
  `    'Cody Barr': '${resolveColor("status.info")}'`,
  "  theme:",
  ...yamlList("activeBorderColor", [resolveColor("accent.1"), "bold"], 2),
  ...yamlList("inactiveBorderColor", [resolveColor("fg.0")], 2),
  ...yamlList("searchingActiveBorderColor", [resolveColor("status.info"), "bold"], 2),
  ...yamlList("optionsTextColor", [resolveColor("syntax.keyword")], 2),
  ...yamlList("selectedLineBgColor", [resolveColor("ui.selection.background.terminal")], 2),
  ...yamlList("inactiveViewSelectedLineBgColor", [resolveColor("bg.3")], 2),
  ...yamlList("cherryPickedCommitFgColor", [resolveColor("ui.selection.foreground")], 2),
  ...yamlList("cherryPickedCommitBgColor", [resolveColor("accent.2")], 2),
  ...yamlList("markedBaseCommitFgColor", [resolveColor("ui.selection.foreground")], 2),
  ...yamlList("markedBaseCommitBgColor", [resolveColor("accent.0")], 2),
  ...yamlList("unstagedChangesColor", [resolveColor("status.warning")], 2),
  ...yamlList("defaultFgColor", [resolveColor("fg.0")], 2),
].join("\n");

const outputUrl = new URL("../dist/lazygit/blacksmith.yml", import.meta.url);
mkdirSync(dirname(fileURLToPath(outputUrl)), { recursive: true });
await Bun.write(outputUrl, `${yaml}\n`);

console.log(`Wrote ${fileURLToPath(outputUrl)}`);
