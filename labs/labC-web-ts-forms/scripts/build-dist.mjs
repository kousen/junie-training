import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const assetsDir = path.join(distDir, 'assets');
const vendorDir = path.join(distDir, 'vendor');

await mkdir(assetsDir, { recursive: true });
await mkdir(vendorDir, { recursive: true });

await copyFile(
  path.join(rootDir, 'node_modules/react/umd/react.development.js'),
  path.join(vendorDir, 'react.development.js'),
);
await copyFile(
  path.join(rootDir, 'node_modules/react-dom/umd/react-dom.development.js'),
  path.join(vendorDir, 'react-dom.development.js'),
);
await copyFile(path.join(rootDir, 'src/styles.css'), path.join(distDir, 'styles.css'));

const sourcePath = path.join(rootDir, 'src/components/RegisterForm.tsx');
const source = await readFile(sourcePath, 'utf8');
const browserSource = source
  .replace(/^import React, \{ useRef, useState \} from 'react';\n\n/, '')
  .replace(/\bexport interface\b/g, 'interface')
  .replace(/\bexport function\b/g, 'function');

const transpiled = ts.transpileModule(browserSource, {
  compilerOptions: {
    jsx: ts.JsxEmit.React,
    module: ts.ModuleKind.None,
    target: ts.ScriptTarget.ES2021,
  },
  fileName: sourcePath,
}).outputText;

await writeFile(
  path.join(assetsDir, 'index.js'),
  `const { useRef, useState } = React;\n${transpiled}\nReactDOM.createRoot(document.getElementById('root')).render(\n  React.createElement(React.StrictMode, null, React.createElement(RegisterForm))\n);\n`,
);

await writeFile(
  path.join(distDir, 'index.html'),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Registration Form Lab</title>
    <link rel="stylesheet" href="/styles.css" />
    <script src="/vendor/react.development.js"></script>
    <script src="/vendor/react-dom.development.js"></script>
    <script defer src="/assets/index.js"></script>
  </head>
  <body>
    <main id="root"></main>
  </body>
</html>
`,
);
