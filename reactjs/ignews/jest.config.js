module.exports = {
  // pastas a serem ignoradas pelo jest na procura de testes
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],

  //array arquivos que o jest deve executar antes de executar os testes
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setupTests.ts"
  ],

  /* convertendo arquivos com as extensões informadas na regex para
   arquivos que possam ser interpretados pelo jest, utilizando o babel-jest
   funciona como os loaders dentro do webpack
  */
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  // Config para lidar com css module no jest, utilizando a lib identity-obj-proxy
  moduleNameMapper: {
    "\\.(scss|css|sass)$": "identity-obj-proxy"
  },
  //indica em que ambiente os testes estão sendo executados
  //o jsdom é nativo do jest
  testEnvironment: 'jsdom',

  collectCoverage: true,
  collectCoverageFrom: [
      "src/**/*.{tsx,jsx}",
      "!src/**/*.{spec.tsx, spec.jsx}",
      "!**/node_modules/**",
      "!src/**/_document.{tsx, jsx}",
      "!src/**/_app.{tsx, jsx}",

  ],
  coverageReporters: ["lcov", "json"],
};
