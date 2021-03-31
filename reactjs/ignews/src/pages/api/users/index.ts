import { NextApiRequest, NextApiResponse } from 'next'

export default (request: NextApiRequest, response: NextApiResponse) => {
  const usersExample = [
    {id:1, name: 'Diego'},
    {id:2, name: 'Renato'},
    {id:3, name: 'Rafael'},
  ]

  return response.json(usersExample)
}
