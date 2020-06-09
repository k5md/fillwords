// eslint-disable-next-line import/no-extraneous-dependencies
const obfuscatingTransformer = require('react-native-obfuscating-transformer');

const filter = filename => filename.startsWith('src');

module.exports = obfuscatingTransformer({
  filter,
  trace: true,
});
