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

const theme = {
  $schema:
    "https://raw.githubusercontent.com/badlogic/pi-mono/main/packages/coding-agent/src/modes/interactive/theme/theme-schema.json",
  name: TOKENS.name.toLowerCase(),
  vars: {
    goldBright: resolveColor("accent.0"),
    gold: resolveColor("accent.1"),
    goldWarm: resolveColor("accent.2"),
    goldDeep: resolveColor("accent.3"),
    charcoal0: resolveColor("bg.0"),
    charcoal1: resolveColor("bg.1"),
    charcoal2: resolveColor("bg.2"),
    charcoal3: resolveColor("bg.3"),
    ivory: resolveColor("fg.0"),
    parchment: resolveColor("fg.1"),
    muted: resolveColor("fg.2"),
    dim: resolveColor("fg.3"),
    blue: resolveColor("syntax.keyword"),
    cyan: resolveColor("status.info"),
    success: resolveColor("status.success"),
    warning: resolveColor("status.warning"),
    error: resolveColor("status.error"),
    selection: resolveColor("ui.selection.background"),
  },
  colors: {
    accent: "gold",
    border: "goldWarm",
    borderAccent: "goldBright",
    borderMuted: "charcoal3",
    success: "success",
    error: "error",
    warning: "warning",
    muted: "muted",
    dim: "dim",
    text: "",
    thinkingText: "parchment",

    selectedBg: "selection",
    userMessageBg: "charcoal2",
    userMessageText: "",
    customMessageBg: "charcoal1",
    customMessageText: "",
    customMessageLabel: "blue",
    toolPendingBg: "charcoal1",
    toolSuccessBg: "charcoal2",
    toolErrorBg: "charcoal2",
    toolTitle: "goldBright",
    toolOutput: "parchment",

    mdHeading: "goldBright",
    mdLink: "blue",
    mdLinkUrl: "muted",
    mdCode: "goldBright",
    mdCodeBlock: "parchment",
    mdCodeBlockBorder: "goldDeep",
    mdQuote: "muted",
    mdQuoteBorder: "goldDeep",
    mdHr: "charcoal3",
    mdListBullet: "goldWarm",

    toolDiffAdded: "gold",
    toolDiffRemoved: "error",
    toolDiffContext: "muted",

    syntaxComment: resolveColor(TOKENS.syntax.comment),
    syntaxKeyword: resolveColor(TOKENS.syntax.keyword),
    syntaxFunction: resolveColor(TOKENS.syntax.function),
    syntaxVariable: resolveColor(TOKENS.syntax.variable),
    syntaxString: resolveColor(TOKENS.syntax.string),
    syntaxNumber: resolveColor(TOKENS.syntax.number),
    syntaxType: resolveColor(TOKENS.syntax.type),
    syntaxOperator: resolveColor(TOKENS.syntax.keywordOperator),
    syntaxPunctuation: resolveColor(TOKENS.syntax.punctuation),

    thinkingOff: "charcoal3",
    thinkingMinimal: "goldDeep",
    thinkingLow: "goldWarm",
    thinkingMedium: "gold",
    thinkingHigh: "blue",
    thinkingXhigh: "cyan",

    bashMode: "goldWarm",
  },
  export: {
    pageBg: resolveColor("bg.0"),
    cardBg: resolveColor("bg.1"),
    infoBg: resolveColor("bg.2"),
  },
};

const outputUrl = new URL("../dist/pi/blacksmith.json", import.meta.url);
mkdirSync(dirname(fileURLToPath(outputUrl)), { recursive: true });
await Bun.write(outputUrl, `${JSON.stringify(theme, null, 2)}\n`);

console.log(`Wrote ${fileURLToPath(outputUrl)}`);
