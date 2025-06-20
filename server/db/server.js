import mongoose from "mongoose";
import dbname from "../constant/Dbname.js";

const connectiondb = async ()=>{
    try {
        const connection = await mongoose.connect(`${process.env.connectionString}/${dbname}`);
        console.log("Db connected successfully" , connection.connection.host);
        
    } catch (error) {
        console.log("Connection failed " , error);
         process.exit(0);
    }
}

export default connectiondb;