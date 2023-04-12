import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose"

export default async function middleware(req: NextRequest, res: NextResponse){
    const bearerToken = req.headers.get("authorization")

    if(!bearerToken){
        return new NextResponse(
            JSON.stringify({ erroMessage: "Unauthorized user" }),{status : 401}
        )
    }

    const token = bearerToken.split(" ")[1]

    if(!token){
        return new NextResponse(
            JSON.stringify({ erroMessage: "Unauthorized user" }),{status : 401}
        )
         
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    
    try {
        await jose.jwtVerify(token,secret)
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ erroMessage: "Unauthorized user" }),{status : 401}
        )
    }
}

export const config = {
    matcher: ["/api/auth/me"]
}