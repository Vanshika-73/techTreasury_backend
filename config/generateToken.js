import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.SECRET_KEY);
const generateToken= (id)=>{
    console.log("genee",id);
    return Jwt.sign({id},process.env.SECRET_PRIVATE_KEY,{
        expiresIn:"7d"
    });
}

export default generateToken;