var OFF = 0, WARN = 1, ERROR = 2;

module.exports = exports = {
  "env": {
    "browser" : true,
    "node" : true,
    "es6": true,
    "jquery": true
  },
  "ecmaFeatures": {
    // env=es6 doesn't include modules, which we are using
    "modules": true
  },
  "extends": ["eslint:recommended", "google"],
  "rules": {
    "no-console": WARN,
    "no-undef": WARN
  },
  "parserOptions": {
    "sourceType": "module"
  }
};