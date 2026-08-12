import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { TOKENS } from "../src/tokens";

function resolveColor(value: string): string {
  const tokenColor = TOKENS.colors[value as keyof typeof TOKENS.colors];
  if (!tokenColor) throw new Error(`Unknown color reference: ${value}`);
  return tokenColor.toUpperCase();
}

const color = (name: string) => resolveColor(name);

// Keep [palette] last: in TOML, it captures all following keys.
const theme = `# Blacksmith — a gold and charcoal theme for Helix.
# Install to ~/.config/helix/themes/blacksmith.toml, then use :theme blacksmith.

"attribute" = "accent_1"
"type" = "accent_1"
"type.builtin" = "accent_2"
"type.parameter" = "accent_0"
"constructor" = "accent_1"
"constant" = "accent_1"
"constant.builtin" = "accent_1"
"constant.character" = "string"
"constant.character.escape" = "string_escape"
"constant.numeric" = "number"
"string" = "string"
"string.regexp" = "info"
"string.special" = "string_escape"
"comment" = { fg = "fg_3", modifiers = ["italic"] }
"comment.documentation" = { fg = "comment_doc", modifiers = ["italic"] }
"variable" = "fg_0"
"variable.builtin" = "accent_2"
"variable.parameter" = "parameter"
"variable.other.member" = "property"
"label" = "accent_0"
"punctuation" = "fg_1"
"punctuation.bracket" = "fg_1"
"punctuation.special" = "accent_0"
"keyword" = "keyword"
"keyword.control" = "keyword"
"keyword.control.import" = "keyword"
"keyword.operator" = "accent_1"
"keyword.directive" = "accent_2"
"operator" = "accent_1"
"function" = "function"
"function.builtin" = "accent_0"
"function.method" = "function"
"function.macro" = "accent_2"
"tag" = "accent_0"
"tag.builtin" = "accent_1"
"namespace" = "accent_2"
"special" = "accent_0"
"embedded" = "fg_0"

"markup.heading" = { fg = "accent_0", modifiers = ["bold"] }
"markup.heading.marker" = "accent_2"
"markup.list" = "accent_1"
"markup.bold" = { fg = "fg_0", modifiers = ["bold"] }
"markup.italic" = { fg = "fg_1", modifiers = ["italic"] }
"markup.strikethrough" = { fg = "fg_3", modifiers = ["crossed_out"] }
"markup.link.url" = { fg = "info", underline = { color = "info", style = "line" } }
"markup.link.text" = "accent_0"
"markup.quote" = "comment_doc"
"markup.raw" = "string"

"diff.plus" = "success"
"diff.minus" = "error"
"diff.delta" = "warning"

"ui.background" = "bg_1"
"ui.background.separator" = "bg_3"
"ui.text" = "fg_0"
"ui.text.focus" = { fg = "fg_0", bg = "selection_bg_picker" }
"ui.text.inactive" = "fg_3"
"ui.text.info" = "accent_0"
"ui.text.directory" = "info"
"ui.text.symlink" = "accent_2"
"ui.cursor" = { fg = "selection_fg", bg = "cursor" }
"ui.cursor.normal" = { fg = "selection_fg", bg = "cursor" }
# Primary normal cursor must override the gold selection background.
"ui.cursor.primary.normal" = { fg = "selection_fg", bg = "accent_2" }
"ui.cursor.insert" = { fg = "selection_fg", bg = "info" }
"ui.cursor.select" = { fg = "selection_fg", bg = "keyword" }
"ui.cursor.primary.select" = { fg = "selection_fg", bg = "keyword" }
"ui.cursor.match" = { fg = "selection_fg", bg = "accent_1" }
"ui.cursor.primary" = { fg = "selection_fg", bg = "cursor" }
"ui.cursorline.primary" = { bg = "bg_2" }
"ui.cursorline.secondary" = { bg = "bg_2" }
"ui.gutter" = "bg_1"
"ui.gutter.selected" = "bg_2"
"ui.linenr" = "fg_3"
"ui.linenr.selected" = { fg = "accent_0", modifiers = ["bold"] }
"ui.statusline" = { fg = "fg_1", bg = "bg_2" }
"ui.statusline.inactive" = { fg = "fg_3", bg = "bg_1" }
"ui.statusline.normal" = { fg = "selection_fg", bg = "accent_1" }
"ui.statusline.insert" = { fg = "selection_fg", bg = "info" }
"ui.statusline.select" = { fg = "selection_fg", bg = "accent_2" }
"ui.statusline.separator" = "bg_3"
"ui.bufferline" = { fg = "fg_3", bg = "bg_0" }
"ui.bufferline.active" = { fg = "accent_0", bg = "bg_2", modifiers = ["bold"] }
"ui.bufferline.background" = "bg_0"
"ui.popup" = { fg = "fg_0", bg = "bg_2" }
"ui.popup.info" = { fg = "fg_0", bg = "bg_2" }
"ui.picker.header" = { fg = "fg_1", bg = "bg_2" }
"ui.picker.header.column" = "fg_3"
"ui.picker.header.column.active" = "accent_0"
"ui.window" = "bg_3"
"ui.help" = { fg = "fg_1", bg = "bg_2" }
"ui.menu" = { fg = "fg_0", bg = "bg_2" }
"ui.menu.selected" = { fg = "selection_fg", bg = "selection_bg" }
"ui.menu.scroll" = { fg = "accent_1", bg = "bg_3" }
"ui.selection" = { fg = "selection_fg", bg = "selection_bg" }
"ui.selection.primary" = { fg = "selection_fg", bg = "selection_bg" }
"ui.highlight" = { bg = "bg_3" }
"ui.virtual.ruler" = "bg_2"
"ui.virtual.whitespace" = "bg_3"
"ui.virtual.indent-guide" = "bg_3"
"ui.virtual.inlay-hint" = { fg = "fg_3", bg = "bg_2", modifiers = ["italic"] }
"ui.virtual.inlay-hint.parameter" = "comment_doc"
"ui.virtual.inlay-hint.type" = "accent_2"
"ui.virtual.wrap" = "fg_3"
"ui.virtual.jump-label" = { fg = "selection_fg", bg = "accent_0", modifiers = ["bold"] }

"warning" = { underline = { color = "warning", style = "curl" } }
"error" = { underline = { color = "error", style = "curl" } }
"info" = { underline = { color = "info", style = "curl" } }
"hint" = { underline = { color = "success", style = "dotted" } }
"diagnostic.warning" = { underline = { color = "warning", style = "curl" } }
"diagnostic.error" = { underline = { color = "error", style = "curl" } }
"diagnostic.info" = { underline = { color = "info", style = "curl" } }
"diagnostic.hint" = { underline = { color = "success", style = "dotted" } }
"diagnostic.unnecessary" = { modifiers = ["dim"] }
"diagnostic.deprecated" = { modifiers = ["crossed_out"] }

rainbow = ["accent_0", "keyword", "success", "info", "string", "accent_2"]

[palette]
bg_0 = "${color("bg.0")}"
bg_1 = "${color("bg.1")}"
bg_2 = "${color("bg.2")}"
bg_3 = "${color("bg.3")}"
fg_0 = "${color("fg.0")}"
fg_1 = "${color("fg.1")}"
fg_3 = "${color("fg.3")}"
accent_0 = "${color("accent.0")}"
accent_1 = "${color("accent.1")}"
accent_2 = "${color("accent.2")}"
keyword = "${color("syntax.keyword")}"
function = "${color("syntax.function")}"
string = "${color("syntax.string")}"
string_escape = "${color("syntax.string.escape")}"
number = "${color("syntax.number")}"
comment_doc = "${color("syntax.comment.doc")}"
parameter = "${color("syntax.variable.parameter")}"
property = "${color("syntax.property")}"
selection_bg = "${color("ui.selection.background")}"
selection_bg_picker = "${color("ui.selection.background.terminal")}"
selection_fg = "${color("ui.selection.foreground")}"
cursor = "${color("ui.cursor")}"
error = "${color("status.error")}"
warning = "${color("status.warning")}"
success = "${color("status.success")}"
info = "${color("status.info")}"
`;

const outputUrl = new URL("../dist/helix/blacksmith.toml", import.meta.url);
mkdirSync(dirname(fileURLToPath(outputUrl)), { recursive: true });
await Bun.write(outputUrl, theme);

console.log(`Wrote ${fileURLToPath(outputUrl)}`);
