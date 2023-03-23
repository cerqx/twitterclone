import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest, 
  response: NextApiResponse 
) {
    if(request.method !== 'POST'){
      return response.status(405).end();
    }

    try {
      const { email, username, name, password} = request.body;
    } catch (error) {
      console.log(error)
      return response.status(400).end();
    }
  }