#!/usr/bin/env bun

import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { basename } from "node:path";

const DIST_ASSETS = [
  "dist/zed/blacksmith.json",
  "dist/warp/blacksmith.yaml",
  "dist/lazygit/blacksmith.yml",
  "dist/pi/blacksmith.json",
] as const;

type ReleaseArg = "patch" | "minor" | "major" | string;

function printHelp() {
  console.log(`Usage:
  bun run release -- <patch|minor|major|x.y.z> [--allow-dirty]

Examples:
  bun run release -- patch
  bun run release -- minor
  bun run release -- 1.2.0

What it does:
  1. Verifies the git working tree is clean (unless --allow-dirty is passed)
  2. Builds all theme artifacts
  3. Bumps package.json version
  4. Commits package.json
  5. Creates git tag v<version>
  6. Pushes the current branch and tag to origin
  7. Triggers the GitHub Actions tag-release workflow
`);
}

async function run(command: string[], options: { allowFailure?: boolean; quiet?: boolean } = {}) {
  const proc = Bun.spawn(command, {
    stdout: options.quiet ? "pipe" : "inherit",
    stderr: options.quiet ? "pipe" : "inherit",
  });

  const stdout = proc.stdout ? await new Response(proc.stdout).text() : "";
  const stderr = proc.stderr ? await new Response(proc.stderr).text() : "";
  const exitCode = await proc.exited;

  if (exitCode !== 0 && !options.allowFailure) {
    throw new Error(`Command failed (${exitCode}): ${command.join(" ")}${stderr ? `\n${stderr.trim()}` : ""}`);
  }

  return { stdout: stdout.trim(), stderr: stderr.trim(), exitCode };
}

function parseArgs(argv: string[]) {
  const args = [...argv];
  const first = args.shift();

  if (!first || first === "-h" || first === "--help") {
    printHelp();
    process.exit(0);
  }

  let allowDirty = false;

  while (args.length > 0) {
    const arg = args.shift();
    if (arg === "--allow-dirty") {
      allowDirty = true;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  return {
    releaseArg: first as ReleaseArg,
    allowDirty,
  };
}

function isExplicitVersion(value: string) {
  return /^\d+\.\d+\.\d+$/.test(value);
}

function bumpVersion(currentVersion: string, releaseArg: ReleaseArg) {
  if (isExplicitVersion(releaseArg)) return releaseArg;

  const match = currentVersion.match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!match) throw new Error(`Current version is not semver: ${currentVersion}`);

  const [, majorRaw, minorRaw, patchRaw] = match;
  let major = Number(majorRaw);
  let minor = Number(minorRaw);
  let patch = Number(patchRaw);

  switch (releaseArg) {
    case "patch":
      patch += 1;
      break;
    case "minor":
      minor += 1;
      patch = 0;
      break;
    case "major":
      major += 1;
      minor = 0;
      patch = 0;
      break;
    default:
      throw new Error(`Unsupported release type: ${releaseArg}`);
  }

  return `${major}.${minor}.${patch}`;
}

async function ensureCleanWorkingTree(allowDirty: boolean) {
  const { stdout } = await run(["git", "status", "--short"], { quiet: true });
  if (stdout && !allowDirty) {
    throw new Error(
      "Working tree is not clean. Commit or stash your changes first, or rerun with --allow-dirty.",
    );
  }
}

async function getCurrentBranch() {
  const { stdout } = await run(["git", "branch", "--show-current"], { quiet: true });
  if (!stdout) throw new Error("Could not determine current git branch.");
  return stdout;
}

async function loadPackageJson() {
  const packageJsonPath = new URL("../package.json", import.meta.url);
  const raw = await readFile(packageJsonPath, "utf8");
  return {
    packageJsonPath,
    packageJson: JSON.parse(raw) as Record<string, unknown>,
    raw,
  };
}

async function main() {
  const { releaseArg, allowDirty } = parseArgs(process.argv.slice(2));

  await ensureCleanWorkingTree(allowDirty);

  const branch = await getCurrentBranch();
  const { packageJsonPath, packageJson } = await loadPackageJson();

  const currentVersion = String(packageJson.version ?? "0.1.0");
  const nextVersion = bumpVersion(currentVersion, releaseArg);
  const tag = `v${nextVersion}`;
  const packageName = String(packageJson.name ?? basename(process.cwd()));

  console.log(`Releasing ${packageName} ${tag} from branch ${branch}`);

  const existingTag = await run(["git", "tag", "--list", tag], { quiet: true });
  if (existingTag.stdout === tag) {
    throw new Error(`Git tag ${tag} already exists.`);
  }

  console.log("Building release artifacts...");
  await run(["bun", "run", "build:all"]);

  for (const asset of DIST_ASSETS) {
    if (!existsSync(asset)) {
      throw new Error(`Missing build artifact: ${asset}`);
    }
  }

  packageJson.version = nextVersion;
  await writeFile(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf8");

  console.log("Committing release version...");
  await run(["git", "add", "package.json"]);
  await run(["git", "commit", "-m", `chore(release): ${tag}`]);

  console.log(`Creating git tag ${tag}...`);
  await run(["git", "tag", tag]);

  console.log(`Pushing ${branch} and ${tag} to origin...`);
  await run(["git", "push", "origin", branch]);
  await run(["git", "push", "origin", tag]);

  console.log(`Done: pushed ${tag}. GitHub Actions will publish the release from this tag.`);
}

main().catch(async (error) => {
  console.error(`\nRelease failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
