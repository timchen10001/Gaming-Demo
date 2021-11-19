module.exports = {
  './client/**/*.{js,jsx,ts,tsx}': ['eslint --config ./client/.eslintrc.js --ext .js,.jsx,.ts,.tsx  --fix'],
  '*.{css,sass,scss}': ['stylelint --config .stylelintrc --fix'],
  '*.{json,md}': ['prettier --write'],
};