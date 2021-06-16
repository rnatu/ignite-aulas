module.exports = {
  // pastas a serem ignoradas pelo jest na procura de testes
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  //array arquivos que o jest deve executar antes de executar os testes
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setupTests.ts"
  ],
  /* convertendo arquivos com as extensões informadas na regex para
   arquivos que possam ser interpretados pelo jest, utilizando o babel-jest
  */
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  //indica em que ambiente os testes estão sendo executados
  //o jsdom é nativo do jest
  testEnvironment: 'jsdom'
};
