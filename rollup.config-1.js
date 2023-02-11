/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {summary} from 'rollup-plugin-summary';
import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

console.log('summary', summary);

export default {
  input: 'my-element.js',
  output: {
    file: 'my-element.bundled.js',
    format: 'esm',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    replace({'Reflect.decorate': 'undefined'}),
    resolve(),
    terser({
      ecma: 2017,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    summary(),
  ],
};

// summary [Function: summary]

// my-element.js → my-element.bundled.js...
// (!) @rollup/plugin-replace: 'preventAssignment' currently defaults to false.
// It is recommended to set this option to `true`, as the next major version will default this option to `true`.
// Build summary for my-element.bundled.js - es
// ┌───────────────────────┬──────────┐
// │ File name             │ Size     │
// │ --------------------- │ -------- │
// │ my-element.bundled.js │ 16.89 kB │
// │ --------------------- │ -------- │
// │ Totals                │ 16.89 kB │
// └───────────────────────┴──────────┘
