import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import productsRouter from "./product_router.js";
import usersRouter from "./users_Router.js";
import { passwordGenarator } from "./passwordGenrator.js";
import bcrypt from "bcrypt"
import loginRouter from "./login_router.js";
import * as dotenv from 'dotenv';
dotenv.config()



const app = express();
const MONGO_URL = process.env.MONGO_URL
const port = 4000
const client = new MongoClient(MONGO_URL);
await client.connect;

// ?middileware
app.use(cors())
app.use(express.json())
app.get("/", (req, res) => {
    res.send("Succesfully iam ruuning")
})
app.use("/products", productsRouter)
app.use("/user", usersRouter)

app.use("/login", loginRouter)




app.listen(port, () => console.log("Server is running"))
console.log("Data Base Connected");
export { client }