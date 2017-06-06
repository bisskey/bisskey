module.exports = {
  env: {
    jest: true
  },
  extends: 'standard',
  plugins: [
    'standard',
    'flowtype',
    'promise',
    'react'
  ],
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error'
  }
}
