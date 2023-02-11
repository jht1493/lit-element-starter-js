// rollup.config.js
// Import rollup plugins
// import html from '@web/rollup-plugin-html';
import {rollupPluginHTML as html} from '@web/rollup-plugin-html';
import {copy} from '@web/rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
// import {terser} from '@rollup/plugin-terser';
import * as terser from '@rollup/plugin-terser';
// import minifyHTML from 'rollup-plugin-minify-html-literals';
import {default as minifyHTML} from 'rollup-plugin-minify-html-literals';
import summary from 'rollup-plugin-summary';

console.log('html', html);
console.log('copy', copy);
console.log('resolve', resolve);
console.log('terser', terser);
console.log('minifyHTML', minifyHTML);
console.log('summary', summary);

export default {
  plugins: [
    // Entry point for application build; can specify a glob to build multiple
    // HTML files for non-SPA app
    html({
      input: 'index.html',
    }),
    // Resolve bare module specifiers to relative paths
    resolve(),
    // Minify HTML template literals
    minifyHTML.default(),
    // Minify JS
    terser.default({
      ecma: 2020,
      module: true,
      warnings: true,
    }),
    // Print bundle summary
    summary.default(),
    // Optional: copy any static assets to build directory
    copy({
      patterns: ['images/**/*'],
    }),
  ],
  output: {
    dir: 'build',
  },
  preserveEntrySignatures: 'strict',
};

// minifyHTML { default: [Function: default_1] }
// terser [Module: null prototype] { default: [Function: terser] }
// summary { default: [Function: summary], summary: [Function: summary] }

// → build...
// Build summary for build - es
// ┌────────────────────────────┬──────┐
// │ File name                  │ Size │
// │ -------------------------- │ ---- │
// │ rollup-plugin-html-noop.js │ 35 B │
// │ -------------------------- │ ---- │
// │ Totals                     │ 35 B │
// └────────────────────────────┴──────┘
// created build in 100ms

// build/rollup-plugin-html-noop.js
// var a="noop";export{a as default};
