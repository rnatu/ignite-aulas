import { createServer, Factory, Model, Response } from "miragejs";
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
          //cria aleatóriamente nos últimos 10 dias
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
      this.get("/users", function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams

        // total de registros por model
        const total = schema.all('user').length

        //converter para number, pois todo queryParams vem como string
        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user')).users.slice(pageStart, pageEnd);

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { users }
        )

      });

      this.post("/users");

      // resetando o namespace após utilização para não conflitar com a api routes do next
      this.namespace = "";
      // passando adiante chamadas api que não forem do mirage, prosseguindo para as api routes
      this.passthrough();
    },

  });

  return server;
}
