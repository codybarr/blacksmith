/**
 * Original Agent Prompt: "I want to create a custom developer theme (TypeScript object with token definitions)
 * that can be ported to Zed/VSCode/Warp Terminal/pi.dev/etc. I'm red/green color blind and while I like
 * the visibility of higher contrast themes they're too severe. I want a custom, aesthetically pleasing theme
 * called 'Blacksmith' that mainly uses Gold and Shades of Dark Gray (Charcoal) and has higher than average
 * contrast. Language keywords should be a shade of blue for some color differentiation. Highlight color should
 * have a gold background / dark foreground (for high contrast)."
 */

export const TOKENS = {
  name: "Blacksmith",
  colors: {
    "bg.0": "#191918",
    "bg.1": "#1E1E1D",
    "bg.2": "#272726",
    "bg.3": "#333331",

    "fg.0": "#FFFDF7",
    "fg.1": "#F0E8D8",
    "fg.2": "#C8BCA5",
    "fg.3": "#9D927F",

    "accent.0": "#FFE14D",
    "accent.1": "#FFC400",
    "accent.2": "#FFAA00",
    "accent.3": "#B87400",

    "status.error": "#FF4D6D",
    "status.warning": "#FFB703",
    "status.success": "#00D1A8",
    "status.info": "#4CC9FF",

    "ui.guide.active": "#5A5852",
    "ui.selection.background": "#FFE14D",
    "ui.selection.background.terminal": "#9A6200",
    "ui.selection.foreground": "#191918",
    "ui.cursor": "#FFE14D",

    "terminal.bright_foreground": "#FFFDF7",
    "terminal.ansi.magenta": "#FF4FD8",
    "terminal.ansi.cyan": "#5CF2FF",
    "terminal.ansi.bright_red": "#FF6B6B",
    "terminal.ansi.bright_green": "#30E3B5",
    "terminal.ansi.bright_yellow": "#FFE14D",
    "terminal.ansi.bright_blue": "#66A3FF",
    "terminal.ansi.bright_magenta": "#FF6AE6",
    "terminal.ansi.bright_cyan": "#8AF7FF",
    "terminal.ansi.bright_white": "#FFFDF7",

    "syntax.keyword": "#66A3FF",
    "syntax.function": "#FFE14D",
    "syntax.string": "#FFD166",
    "syntax.number": "#FFB347",
    "syntax.comment.doc": "#9E9481",
    "syntax.variable.parameter": "#FFF6E6",
    "syntax.property": "#FFCA28",
    "syntax.string.escape": "#FFF08A",
  },
  syntax: {
    keyword: "syntax.keyword",
    keywordOperator: "accent.1",
    function: "syntax.function",
    functionMethod: "syntax.function",
    type: "accent.1",
    typeBuiltin: "accent.2",
    string: "syntax.string",
    stringEscape: "syntax.string.escape",
    number: "syntax.number",
    comment: "fg.3",
    commentDoc: "syntax.comment.doc",
    variable: "fg.0",
    variableParameter: "syntax.variable.parameter",
    property: "syntax.property",
    constant: "accent.1",
    constantBuiltin: "accent.1",
    punctuation: "fg.1",
    punctuationBracket: "fg.1",
    tag: "accent.0",
    attribute: "accent.1",
  },
};
