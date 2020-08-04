const obfuscatingTransformer = require('react-native-obfuscating-transformer');

module.exports = obfuscatingTransformer({
  // this configuration is based on https://github.com/javascript-obfuscator/javascript-obfuscator
  obfuscatorOptions: {
    compact: true,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    shuffleStringArray: true,
    splitStrings: false,
    stringArray: true,
    stringArrayEncoding: false,
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false,
  },
  upstreamTransformer: require('metro-react-native-babel-transformer'),
  emitObfuscatedFiles: false,
  enableInDevelopment: false,
  filter: filename => filename.startsWith('src'),
  trace: true,
});
