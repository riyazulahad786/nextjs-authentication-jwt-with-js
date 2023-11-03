import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import  Jwt from "jsonwebtoken";

connect();

export async function POST(request=NextRequest){
  try {
    const reqBody = await request.json()
    const {email,password} = reqBody
    console.log(reqBody,"login backend")

     //check user already exist
     const user = await User.findOne({email})
     if(!user){
        return NextResponse.json({error:"User does'nt exist"},{status:400})
     }
     
     //check password if correct
     const validPassword = await bcryptjs.compare(password,user.password)

     if(!validPassword){
        return NextResponse.json({error:"Invalid password"},{status:400})
     }
    // //create token
    const tokenData = {
         id:user._id,
         username:user.username,
         email:user.email
    }

    //create token
      const token = await  Jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:'1d'}) 
      const response =  NextResponse.json({
        message:"Login success",
        success:true

      })
      response.cookies.set("token",token,{
        httpOnly:true
    })
      return response;


  } catch (error) {
    return NextResponse.json({error:error.message},{status:500})
  }
}