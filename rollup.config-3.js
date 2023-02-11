// Import rollup plugins
import html from '@web/rollup-plugin-html';
import {copy} from '@web/rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import {terser} from '@rollup/plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import summary from 'rollup-plugin-summary';

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
    minifyHTML(),
    // Minify JS
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
    }),
    // Print bundle summary
    summary(),
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

// [!] SyntaxError: The requested module '@web/rollup-plugin-html' does not provide an export named 'default'
// file:///Users/jht2/Documents/projects/_planning-molab-repos/lit-element-starter-js/rollup.config.js:2
// import html from '@web/rollup-plugin-html';
//        ^^^^
//     at ModuleJob._instantiate (node:internal/modules/esm/module_job:124:21)
//     at async ModuleJob.run (node:internal/modules/esm/module_job:190:5)
