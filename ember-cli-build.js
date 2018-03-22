'use strict';

const CssImport = require('postcss-import');
const CssNext = require('postcss-cssnext');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    snippetSearchPaths: ['src'],
    postcssOptions: {
      compile: {
        enabled: true,
        plugins: [
          { module: CssImport },
          { module: CssNext }
        ]
      }
    }
  });

  app.import('node_modules/fullscreen-api-polyfill/fullscreen-api-polyfill.js', {
    using: [
    ]
  });
  return app.toTree();
};
