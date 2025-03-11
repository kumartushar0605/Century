import express from "express";

import { connectDB } from "./data/database.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import router from "./routes/Hospital.js";
import routerr from "./routes/Visitor.js";

 const app = express();
 connectDB();
 app.use(express.json());
 app.use(cookieParser())
 app.use(cors({
    origin:["http://192.168.152.25:3000","http://192.168.152.25:3001","http://localhost:3000","http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials:true,
}))
app.use(router)
 app.use(routerr);


app.get("/",(req,res)=>{
    res.send("working")
})


app.listen(5000,()=>{
    console.log(`server is working on port : 5000 `)
})