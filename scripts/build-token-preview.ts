import { TOKENS } from "../src/tokens";

function toCssVarName(token: string): string {
  return `--${token.replace(/\./g, "-")}`;
}

function getSectionName(token: string): string {
  const [section] = token.split(".");
  return section;
}

const sectionTitles: Record<string, string> = {
  bg: "Backgrounds",
  fg: "Foregrounds",
  accent: "Gold accents",
  status: "Status",
  ui: "UI",
  terminal: "Terminal",
  syntax: "Syntax",
};

const tokensBySection = Object.entries(TOKENS.colors).reduce(
  (acc, [token, value]) => {
    const section = getSectionName(token);
    acc[section] ??= [];
    acc[section].push([token, value]);
    return acc;
  },
  {} as Record<string, Array<[string, string]>>,
);

const orderedSections = ["bg", "fg", "accent", "status", "ui", "terminal", "syntax"];

const css = [
  `/* Auto-generated from src/tokens.ts. Run: bun run build:preview */`,
  `:root {`,
  ...orderedSections.flatMap((section) => {
    const entries = tokensBySection[section] ?? [];
    if (entries.length === 0) return [];

    return [
      `  /* ${sectionTitles[section] ?? section} */`,
      ...entries.map(([token, value]) => `  ${toCssVarName(token)}: ${value};`),
      "",
    ];
  }),
  `}`,
  "",
].join("\n");

await Bun.write(new URL("../src/tokens-preview.css", import.meta.url), css);
console.log("Wrote src/tokens-preview.css");
