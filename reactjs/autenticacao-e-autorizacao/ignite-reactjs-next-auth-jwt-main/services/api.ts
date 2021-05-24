import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";

let cookies = parseCookies();

export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Bearer ${cookies["nextauth.token"]}`,
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response.status === 401) {
      if (error.response.data?.code === "token.expired") {
        //renovar o token
        cookies = parseCookies();
        const refreshToken = cookies["nextauth.refreshToken"];

        api.post("/refresh", {
            refreshToken,
        }).then((response) => {
            const { token } = response.data;
            //undefined, pois está sendo setado pelo lado do browser
            setCookie(undefined, "nextauth.token", token, {
              //por quanto tempo manter o cookie salvo no navegador, porem a renovação ou controle mesmo antes de expirar é feita pelo back-end
              maxAge: 60 * 60 * 24 * 30, //30 days
              // quais caminhos da aplicação vão ter acesso a esse cookie, colocando '/', voce informa que todos os endereços vao ter acesso. Uma forma de utilizar o cookie globalmente na aplicação
              path: "/",
            });

            setCookie(
              undefined,
              "nextauth.refreshToken",
              response.data.refreshToken,
              {
                maxAge: 60 * 60 * 24 * 30, //30 days
                path: "/",
              }
            );
            
            api.defaults.headers['Authorization'] = `Bearer ${token}`
          });
      } else {
        //deslogar o usuário
      }
    }
  }
);
