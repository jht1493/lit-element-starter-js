// Import rollup plugins
var html = require('@web/rollup-plugin-html');
import {copy} from '@web/rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
var {terser} = require('@rollup/plugin-terser');
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

// [!] RollupError: Node tried to load your configuration as an ES module even
// though it is likely CommonJS. To resolve this, change the extension of your configuration to
// ".cjs" or pass the "--bundleConfigAsCjs" flag.

// Original error: require is not defined in ES module scope, you can use import instead
// This file is being treated as an ES module because it has a '.js' file extension and
// '/Users/jht2/Documents/projects/_planning-molab-repos/lit-element-starter-js/package.json'
//  contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
