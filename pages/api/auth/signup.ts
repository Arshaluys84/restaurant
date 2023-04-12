import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import bcript from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { firstName, lastName, email, city, phone, password } = req.body;

    const errors: string[] = [];
    const validationSchema = [
      {
        valid: validator.isLength(firstName, { min: 1, max: 15 }),
        errorMessage: "First name is invalid",
      },
      {
        valid: validator.isLength(lastName, { min: 1, max: 15 }),
        errorMessage: "Last name is invalid",
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid",
      },
      {
        valid: validator.isLength(city, { min: 1 }),
        errorMessage: "City is invalid",
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: "Phone is invalid",
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: "Password is invalid",
      },
    ];

    validationSchema.forEach((check) => {
      if (!check.valid) errors.push(check.errorMessage);
    });
    if (errors.length) {
      return res.status(400).json({ message: errors[0] });
    }
    const exisingUser = await prisma.user.findUnique({
      where: {
        email,
      } as any,
    });
    const hashedPassword = await bcript.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        city,
        phone,
        email,
        password: hashedPassword,
      },
    });
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";
    const token = await new jose.SignJWT({
      email: user.email,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);
      setCookie("jwt", token, { req, res, maxAge: 60*6*24 } )
    return res.status(200).json({
      firstName: user.first_name,
      lastName: user.last_name,
      city: user.city,
      phone: user.phone,
      email: user.email
    });
  }
  return res.status(404).json({ errorMessage: "Invalid Endpoint" });
}
