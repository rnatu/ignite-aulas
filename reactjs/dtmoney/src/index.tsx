import React from "react";
import ReactDOM from "react-dom";

import { createServer, Model } from 'miragejs';

import { App } from "./App";

//miragejs
createServer({

  //"banco de dados transaction"
  models: {
    transaction: Model,
  },

  seeds(server) {
    //fazendo um mock do load de dados do db
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-02-14 11:00:00'),
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    //rota de get
    this.get('/transactions', () => {
      //retornando todos os resultados do schema(banco de dados server)
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
