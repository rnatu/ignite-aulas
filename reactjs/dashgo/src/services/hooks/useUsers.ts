import { useQuery } from "react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

type GetUsersResponse = {
  totalCount: number;
  users: User[];
}

export async function getUsers(page: number): Promise<GetUsersResponse> {

  //rota /users, porem não precisa da /
  const { data, headers } = await api.get('users', {
    params: {
      page,
    }
  })

  const totalCount = Number(headers['x-total-count'])

  const users = data.users.map(user => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    };
  });

  return {
    users,
    totalCount
  };
}

export function useUsers(page: number) {
  /*
    'users' funciona como uma chave, igual no localStorage
    Porem, como o react-query usa o cache de informação,
    somente utilizando useQuery('users', () => ...), a paginação
    não irá funcionar, pois ele não ira realizar a consulta dos dados novamente
    quando clicado em uma nova página, pois irá verificar que os
    dados já estão em cache

    Por isso é utilizado uma "chave composta" ficando
    useQuery(['users', page], () => ...)
    Pois assim, a page irá mudar, forçando o react query a atualizar a
    consulta dos dados

    assim ele guarda em cache os usuários para cada página

    *Aula 'trocando de página'
  */

  return useQuery(['users', page], () => getUsers(page), {

    //tempo que os dados permaneceram "fresh"
    staleTime: 1000 * 60 * 10 // 10 minutes
  })

}
