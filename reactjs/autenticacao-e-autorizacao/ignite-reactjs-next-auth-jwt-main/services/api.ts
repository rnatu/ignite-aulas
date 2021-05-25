import axios, { AxiosError } from "axios";
import { parseCookies, setCookie } from "nookies";
import { signOut } from "../contexts/AuthContext";

let isRefreshing = false;
let failedRequestQueue = [];

export function setupAPIClient(context = undefined) {
  let cookies = parseCookies(context);

  const api = axios.create({
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
          cookies = parseCookies(context);
          const refreshToken = cookies["nextauth.refreshToken"];
          const originalConfig = error.config;
  
          if (!isRefreshing) {
            isRefreshing = true;

            console.log('refresh')
  
            api
              .post("/refresh", {
                refreshToken,
              })
              .then((response) => {
                const { token } = response.data;
                //undefined, pois está sendo setado pelo lado do browser
                setCookie(context, "nextauth.token", token, {
                  //por quanto tempo manter o cookie salvo no navegador, porem a renovação ou controle mesmo antes de expirar é feita pelo back-end
                  maxAge: 60 * 60 * 24 * 30, //30 days
                  // quais caminhos da aplicação vão ter acesso a esse cookie, colocando '/', voce informa que todos os endereços vao ter acesso. Uma forma de utilizar o cookie globalmente na aplicação
                  path: "/",
                });
  
                setCookie(
                  context,
                  "nextauth.refreshToken",
                  response.data.refreshToken,
                  {
                    maxAge: 60 * 60 * 24 * 30, //30 days
                    path: "/",
                  }
                );
  
                api.defaults.headers["Authorization"] = `Bearer ${token}`;
  
                failedRequestQueue.forEach((request) => request.onSuccess(token));
                failedRequestQueue = [];
              })
              .catch((err) => {
                failedRequestQueue.forEach((request) => request.onFailure(err));
                failedRequestQueue = [];
  
                if(process.browser) {
                  signOut()
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }
  
          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: (token: string) => {
                originalConfig.headers["Authorization"] = `Barrer ${token}`;
  
                resolve(api(originalConfig));
              },
              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        } else {
          //deslogar o usuário
          if(process.browser) {
            signOut()
          }
        }
      }
  
      return Promise.reject(error);
  });
  
  return api;
}