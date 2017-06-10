module.exports = {
  env: {
    jest: true,
    browser: true
  },
  parser: 'babel-eslint',
  extends: 'standard',
  plugins: [
    'flowtype',
    'standard',
    'promise',
    'react'
  ],
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error'
  }
}
