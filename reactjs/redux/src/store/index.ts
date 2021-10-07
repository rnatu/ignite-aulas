import { createStore } from "redux";

const store = createStore(() => {
  return { id: 3, name: "Diego", email: "diego@rocketseat.com.br" };
});

export default store;
