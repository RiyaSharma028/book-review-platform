import app from "./app.js"
import dotenv from "dotenv";
import connectiondb from "./db/server.js"
dotenv.config();

const port = 3000;

connectiondb()
.then(()=>{
    app.listen(port , ()=>{
        console.log("server started successfully" , port);
    })
})
.catch((err)=>{
    console.log("Server connection failed");
})
