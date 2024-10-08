import jwt from "jsonwebtoken";

export const        generateJWT = (res, id) =>{
    const token = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',   
    } )

    res.cookie("token", token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7*24*60*60*1000
    })

    return token;
}