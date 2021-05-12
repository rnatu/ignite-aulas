import { createServer, Model } from 'miragejs';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({

    //tipos de dados que serão armazenados no banco de dados "fictício"
    models: {
      user: Model.extend<Partial<User>>({})
    },

    routes() {
      // setando o namespace para 'api' ex: localhost:3000/api/users
      this.namespace = 'api';

      // adicionando delay nas chamadas api no mirage
      this.timing = 750;

      //Shorthands - automatizando as rotas
      this.get('/users');
      this.post('/users');

      // resetando o namespace após utilização para não conflitar com a api routes do next
      this.namespace = '';
      // passando adiante chamadas api que não forem do mirage, prosseguindo para as api routes
      this.passthrough()
    }
  })

  return server;
}
