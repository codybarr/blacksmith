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

## Install

<details>
<summary><strong>Zed</strong></summary>

```bash
mkdir -p ~/.config/zed/themes && curl -fL https://github.com/codybarr/blacksmith/releases/latest/download/blacksmith-zed.json -o ~/.config/zed/themes/blacksmith.json
```

Then restart Zed or reload the window, open the theme picker, and select **Blacksmith**.

</details>

<details>
<summary><strong>Warp</strong></summary>

```bash
mkdir -p ~/.warp/themes && curl -fL https://github.com/codybarr/blacksmith/releases/latest/download/blacksmith-warp.yaml -o ~/.warp/themes/blacksmith.yaml
```

Then restart Warp or wait a few moments for the theme list to refresh, and select **Blacksmith** in Warp's appearance settings.

</details>

<details>
<summary><strong>Lazygit</strong></summary>

```bash
mkdir -p "$HOME/Library/Application Support/lazygit" && curl -fL https://github.com/codybarr/blacksmith/releases/latest/download/blacksmith-lazygit.yml -o "$HOME/Library/Application Support/lazygit/blacksmith.yml"
```

This downloads the generated Lazygit theme file as `blacksmith.yml`. If you want to use it as your full Lazygit config, rename it to `config.yml`. If you already have a Lazygit config, copy just the `gui.theme` block from `blacksmith.yml` into your existing `config.yml`.

</details>

<details>
<summary><strong>pi</strong></summary>

```bash
mkdir -p ~/.pi/agent/themes && curl -fL https://github.com/codybarr/blacksmith/releases/latest/download/blacksmith-pi.json -o ~/.pi/agent/themes/blacksmith.json
```

Then select `blacksmith` in pi via `/settings`.

</details>

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
- it installs dependencies and runs `bun run build:all`
- it copies release artifacts to uniquely named files to avoid GitHub asset filename collisions
- it publishes a GitHub release with generated notes

Generated files:

- `dist/zed/blacksmith.json`
- `dist/warp/blacksmith.yaml`
- `dist/lazygit/blacksmith.yml`
- `dist/pi/blacksmith.json`

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
