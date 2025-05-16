#!/usr/bin/env node

if (process.env.npm_execpath.includes('npm') || process.env.npm_execpath.includes('yarn')) {
  console.error('\x1b[31m%s\x1b[0m', 'You must use pnpm to install dependencies in this project');
  console.error('\x1b[36m%s\x1b[0m', 'Please run: pnpm install');
  process.exit(1);
}
