import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';

export default async function handler(
  request: NextApiRequest, 
  response: NextApiResponse 
) {
    if(request.method !== 'POST'){
      return response.status(405).end();
    }

    try {
      const { email, username, name, password} = request.body;

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await prisma.user.create({
        data: {
          email,
          username,
          name,
          hashedPassword
        }
      });

      return response.status(200).json(user);
    } catch (error) {
      console.log(error)
      return response.status(400).end();
    }
  }