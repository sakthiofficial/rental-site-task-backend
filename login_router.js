import { client } from "./index.js";
import express from "express";

const loginRouter = express.Router()
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import { passwordGenarator } from "./passwordGenrator.js";



loginRouter.post("/signup", async (req, res) => {
    let data = req.body;
    const user = await client.db("rent-users").collection("login").findOne({ "name": data.name })
    console.log(user);
    if (!user) {
        const password = await passwordGenarator(data.password);
        data.password = password;
        const user = await client.db("rent-users").collection("login").insertOne(data);
        let token = jwt.sign({ id: data.name }, "Secrate-Key");

        res.status(200).send({ token })
    } else {
        res.status(401).send("Already User Are There")
    }
})

loginRouter.post("/", async (req, res) => {
    const data = req.body;
    const user = await client.db("rent-users").collection("login").findOne({ "name": data.name })
    if (user) {
        const password = await bcrypt.compare(data.password, user.password)
        if (password) {
            let token = jwt.sign({ id: data.name }, "Secrate-Key");

            res.status(200).send({ token })
        } else {
            res.status(401).send("Unauthorized ");

        }
    } else {
        res.status(401).send("Unauthorized ");

    }
})
export default loginRouter