var OFF = 0, WARN = 1, ERROR = 2;

module.exports = exports = {
  "env": {
    "browser" : true,
    "node" : true,
    "es6": true,
    "jquery": true
  },
  "ecmaFeatures": {
    "modules": true
  },
  "extends": ["eslint:recommended", "google"],
  "rules": {
    "no-console": WARN,
    "no-undef": WARN,
    "no-unused-vars": WARN
  },
  "parserOptions": {
    "sourceType": "module"
  }
};