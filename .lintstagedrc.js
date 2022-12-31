/* https://amanhimself.dev/blog/setup-nextjs-project-with-eslint-prettier-husky-lint-staged/ */
const path = require('path')

const buildEslintCommand = (filenames) =>
  `next lint --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`

module.exports = {
  '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
}
