import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI)
        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log("database connected successfully");
        })
        connection.on('error',(err)=>{
             console.log("database is not connected" + err)
             process.exit();
        })
    } catch (error) {
        console.log(error)
    }
}