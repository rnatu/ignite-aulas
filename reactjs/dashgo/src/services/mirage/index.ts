import { createServer, Factory, Model } from "miragejs";
import faker from 'faker';

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    //tipos de dados que serão armazenados no banco de dados "fictício"
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    //geração de dados em massa
    factories: {
      user: Factory.extend({
        name(i: number){
          return `User ${i + 1}`
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        //pode ser em camelCase pois o mirage ira converter para snake_case
        createdAt() {
          return faker.date.recent(10);
        },
      })
    },
    //geração de dados iniciais
    seeds(server) {
      server.createList('user', 200)
    },

    routes() {
      // setando o namespace para 'api' ex: localhost:3000/api/users
      this.namespace = "api";

      // adicionando delay nas chamadas api no mirage
      this.timing = 750;

      //Shorthands - automatizando as rotas
      this.get("/users");
      this.post("/users");

      // resetando o namespace após utilização para não conflitar com a api routes do next
      this.namespace = "";
      // passando adiante chamadas api que não forem do mirage, prosseguindo para as api routes
      this.passthrough();
    },
  });

  return server;
}
