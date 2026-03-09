# blacksmith

![Blacksmith theme preview](./blacksmith.png)

Blacksmith is a high-contrast (but not harsh) developer theme built around rich gold and charcoal tones, with blue language keywords for clear differentiation and gold-on-dark highlights for strong readability.

## Design goals

- Accessible for red/green color blindness
- Higher-than-average contrast without eye strain
- Gold + charcoal core palette with restrained accents
- Blue keywords for language-level differentiation
- Gold highlight backgrounds with dark foreground text for clear selection states
- Portable token philosophy for Zed, VSCode, Warp, Terminal, and pi.dev

## Theme docs

- [Warp custom themes](https://docs.warp.dev/terminal/appearance/custom-themes)
- [Zed themes](https://zed.dev/docs/extensions/themes)
- [pi themes](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/themes.md)
- [Lazygit config and theming](https://github.com/jesseduffield/lazygit/blob/master/docs/Config.md)

## Build themes

```bash
bun run build:zed
bun run build:warp
bun run build:lazygit
bun run build:pi
bun run build:all
```

## Create a GitHub release

This repo includes a release script that builds the themes, bumps `package.json`, creates a git tag, and pushes the branch + tag to GitHub. A GitHub Actions workflow then automatically publishes the GitHub release from the pushed tag and attaches the generated artifacts.

```bash
bun run release -- patch
bun run release -- minor
bun run release -- 1.2.0
```

Optional flags:

- `--allow-dirty` to skip the clean-working-tree check

Requirements:

- your current branch must already be pushed to `origin`
- GitHub Actions must be enabled for the repository

Workflow:

- `.github/workflows/release.yml` runs on tags matching `v*`
- it installs dependencies, runs `bun run build:all`, and publishes a GitHub release with generated notes

Generated files:

- `dist/zed/blacksmith.json`
- `dist/warp/blacksmith.yaml`
- `dist/lazygit/blacksmith.yml`
- `dist/pi/blacksmith.json`

## Install in Zed

For a local/manual Zed install, copy the generated theme into your Zed themes directory:

```bash
mkdir -p ~/.config/zed/themes
cp dist/zed/blacksmith.json ~/.config/zed/themes/
```

Then restart Zed or reload the window, open the theme picker, and select **Blacksmith**.

## Install in Warp

Copy the generated Warp theme into your local Warp themes directory:

```bash
mkdir -p ~/.warp/themes
cp dist/warp/blacksmith.yaml ~/.warp/themes/
```

Then restart Warp or wait a few moments for the theme list to refresh, and select **Blacksmith** in Warp's appearance settings.

## Install in Lazygit

If you want to use Blacksmith as your Lazygit theme config on macOS:

```bash
mkdir -p "$HOME/Library/Application Support/lazygit"
cp dist/lazygit/blacksmith.yml "$HOME/Library/Application Support/lazygit/config.yml"
```

If you already have a Lazygit config, copy just the `gui.theme` block from `dist/lazygit/blacksmith.yml` into your existing `config.yml` instead of overwriting the whole file.

## Install in pi

Copy the generated pi theme into your global pi themes directory:

```bash
mkdir -p ~/.pi/agent/themes
cp dist/pi/blacksmith.json ~/.pi/agent/themes/
```

Then select `blacksmith` in pi via `/settings`.

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
