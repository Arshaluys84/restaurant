import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose"
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse){

    const bearerToken = req.headers["authorization"] as string
  
    const token = bearerToken.split(" ")[1]

    const payload =  jwt.decode(token) as {email : string}

    if (!payload){
        return res.status(401).json({ erroMessage: "Unauthorized user" })
    }
    const user = await prisma.user.findUnique({
        where: {
            email: payload.email
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            city: true,
            email: true,
            phone:true
        }
    })

    if(!user){
        return res.status(401).json({ erroMessage: "Unauthorized user" })
    }

    return res.status(200).json({ email: user.email, firstName: user.first_name,lastName: user.last_name, id: user.id, city: user.city, phone: user.phone })

}