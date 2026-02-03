import express from "express";
import app from "./app.js";
import { connection } from "./config/db.js";


connection();
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is running on the port ${PORT}`);
})