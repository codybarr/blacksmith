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
  name: TOKENS.name,
  author: "Cody Barr",
  themes: [
    {
      name: TOKENS.name,
      appearance: "dark",
      style: {
        accents: [
          resolveColor("accent.0"),
          resolveColor("accent.1"),
          resolveColor("accent.2"),
        ],
        background: resolveColor("bg.0"),
        foreground: resolveColor("fg.0"),
        border: resolveColor("bg.3"),
        "border.disabled": resolveColor("bg.2"),
        "border.focused": resolveColor("accent.2"),
        "border.selected": resolveColor("accent.3"),
        "element.background": resolveColor("bg.1"),
        "element.hover": resolveColor("bg.2"),
        "element.active": resolveColor("bg.3"),
        "element.selected": resolveColor("bg.3"),
        "element.disabled": resolveColor("bg.1"),
        "ghost_element.background": resolveColor("bg.0"),
        "ghost_element.hover": resolveColor("bg.1"),
        "ghost_element.active": resolveColor("bg.2"),
        "ghost_element.selected": resolveColor("bg.2"),
        "ghost_element.disabled": resolveColor("bg.0"),
        "elevated_surface.background": resolveColor("bg.1"),
        "surface.background": resolveColor("bg.0"),
        "tab_bar.background": resolveColor("bg.0"),
        "tab.active_background": resolveColor("bg.1"),
        "tab.inactive_background": resolveColor("bg.0"),
        "editor.background": resolveColor("bg.1"),
        "editor.foreground": resolveColor("fg.0"),
        "editor.gutter.background": resolveColor("bg.1"),
        "editor.line_number": resolveColor("fg.2"),
        "editor.active_line_number": resolveColor("fg.1"),
        "editor.active_line.background": resolveColor("bg.2"),
        "editor.highlighted_line.background": resolveColor("bg.2"),
        "editor.document_highlight.read_background": `${resolveColor("ui.selection.background")}40`,
        "editor.document_highlight.read_foreground": resolveColor(
          "ui.selection.foreground",
        ),
        "editor.document_highlight.write_background": `${resolveColor("ui.selection.background")}55`,
        "editor.document_highlight.write_foreground": resolveColor(
          "ui.selection.foreground",
        ),
        "editor.selection.background": resolveColor("ui.selection.background"),
        "editor.selection.foreground": resolveColor("ui.selection.foreground"),
        "search.match_background": resolveColor("ui.selection.background"),
        "search.match_foreground": resolveColor("ui.selection.foreground"),
        "editor.indent_guide": resolveColor("bg.3"),
        "editor.indent_guide_active": resolveColor("ui.guide.active"),
        "editor.wrap_guide": resolveColor("bg.3"),
        "editor.active_wrap_guide": resolveColor("ui.guide.active"),
        "editor.invisible": resolveColor("fg.3"),
        error: resolveColor("status.error"),
        "error.background": resolveColor("bg.2"),
        "error.border": resolveColor("status.error"),
        warning: resolveColor("status.warning"),
        "warning.background": resolveColor("bg.2"),
        "warning.border": resolveColor("status.warning"),
        success: resolveColor("status.success"),
        "success.background": resolveColor("bg.2"),
        "success.border": resolveColor("status.success"),
        hint: resolveColor("status.info"),
        "hint.background": resolveColor("bg.1"),
        "hint.border": resolveColor("bg.3"),
        icon: resolveColor("fg.1"),
        "icon.accent": resolveColor("accent.0"),
        "icon.disabled": resolveColor("fg.3"),
        "terminal.background": resolveColor("bg.0"),
        "terminal.foreground": resolveColor("fg.0"),
        "terminal.bright_foreground": resolveColor(
          "terminal.bright_foreground",
        ),
        "terminal.dim_foreground": resolveColor("fg.1"),
        "terminal.ansi.background": resolveColor("bg.0"),
        "terminal.ansi.black": resolveColor("bg.1"),
        "terminal.ansi.red": resolveColor("status.error"),
        "terminal.ansi.green": resolveColor("status.success"),
        "terminal.ansi.yellow": resolveColor("accent.0"),
        "terminal.ansi.blue": resolveColor("status.info"),
        "terminal.ansi.magenta": resolveColor("terminal.ansi.magenta"),
        "terminal.ansi.cyan": resolveColor("terminal.ansi.cyan"),
        "terminal.ansi.white": resolveColor("fg.0"),
        "terminal.ansi.bright_black": resolveColor("fg.3"),
        "terminal.ansi.bright_red": resolveColor("terminal.ansi.bright_red"),
        "terminal.ansi.bright_green": resolveColor(
          "terminal.ansi.bright_green",
        ),
        "terminal.ansi.bright_yellow": resolveColor(
          "terminal.ansi.bright_yellow",
        ),
        "terminal.ansi.bright_blue": resolveColor("terminal.ansi.bright_blue"),
        "terminal.ansi.bright_magenta": resolveColor(
          "terminal.ansi.bright_magenta",
        ),
        "terminal.ansi.bright_cyan": resolveColor("terminal.ansi.bright_cyan"),
        "terminal.ansi.bright_white": resolveColor(
          "terminal.bright_foreground",
        ),
        players: [
          {
            cursor: resolveColor("ui.cursor"),
            selection: resolveColor("ui.selection.background"),
            background: resolveColor("ui.selection.background"),
          },
        ],
        syntax: {
          comment: { color: resolveColor(TOKENS.syntax.comment) },
          "comment.doc": {
            color: resolveColor(TOKENS.syntax.commentDoc),
            font_style: "italic",
          },
          keyword: { color: resolveColor(TOKENS.syntax.keyword) },
          "keyword.operator": {
            color: resolveColor(TOKENS.syntax.keywordOperator),
          },
          function: { color: resolveColor(TOKENS.syntax.function) },
          "function.method": {
            color: resolveColor(TOKENS.syntax.functionMethod),
          },
          type: { color: resolveColor(TOKENS.syntax.type) },
          "type.builtin": { color: resolveColor(TOKENS.syntax.typeBuiltin) },
          variable: { color: resolveColor(TOKENS.syntax.variable) },
          "variable.parameter": {
            color: resolveColor(TOKENS.syntax.variableParameter),
          },
          property: { color: resolveColor(TOKENS.syntax.property) },
          string: { color: resolveColor(TOKENS.syntax.string) },
          "string.escape": { color: resolveColor(TOKENS.syntax.stringEscape) },
          number: { color: resolveColor(TOKENS.syntax.number) },
          constant: { color: resolveColor(TOKENS.syntax.constant) },
          "constant.builtin": {
            color: resolveColor(TOKENS.syntax.constantBuiltin),
          },
          punctuation: { color: resolveColor(TOKENS.syntax.punctuation) },
          "punctuation.bracket": {
            color: resolveColor(TOKENS.syntax.punctuationBracket),
          },
          tag: { color: resolveColor(TOKENS.syntax.tag) },
          attribute: { color: resolveColor(TOKENS.syntax.attribute) },
        },
      },
    },
  ],
};

const outputUrl = new URL("../dist/zed/blacksmith.json", import.meta.url);
mkdirSync(dirname(fileURLToPath(outputUrl)), { recursive: true });
await Bun.write(outputUrl, `${JSON.stringify(theme, null, 2)}\n`);

console.log(`Wrote ${fileURLToPath(outputUrl)}`);
