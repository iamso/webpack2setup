module.exports = {
  parser: 'postcss-scss',
  plugins: {
    'postcss-import': {},
    'postcss-mixins': {},
    'postcss-for': {},
    'postcss-each': {},
    'postcss-cssnext': {
      diff: true,
      map: false,
      remove: false,
    },
    'postcss-nested': {},
    // 'postcss-discard-comments': {
    //   removeAll: true
    // },
    'postcss-reporter': {
      clearMessages: true
    },
    // 'autoprefixer': {},
    'cssnano': {
      discardComments: {
        removeAll: true
      }
    }
  }
}