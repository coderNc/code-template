/* eslint-env node */
// require('@rushstack/eslint-patch/modern-module-resolution')
require('./src/rules/require-watch-cleanup.ts')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'require-watch-cleanup': 'error' // 使用新规则
  }
}
