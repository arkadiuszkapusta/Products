module.exports = {
  testMatch: [
    '**/__tests__/**/*.ts?(x)',
  ],
  transform: {
    '^.+\\.tsx?$': 'babel-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
