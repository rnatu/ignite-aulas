import React from "react";
import ReactDOM from "react-dom";

import { createServer, Model } from 'miragejs';

import { App } from "./App";

createServer({

  models: {
    transaction: Model,
  },

  routes() {
    this.namespace = 'api';

    //rota de get
    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    //rota de post
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
