import { client } from "./index.js";
import express from "express";
import { ObjectId } from "mongodb";

const usersRouter = express.Router()
// user Infos
usersRouter.post("/rental/:name", async (req, res) => {
    const { name } = req.params

    const data = req.body;
    const result = await client.db("rent-users").collection(name).insertOne(data, (err, msg) => {
        if (msg) {
            res.status(200).send(msg);
        } else {
            res.send(err)
        }
    })
})

usersRouter.delete("/:name/return/:id", async (req, res) => {
    const { id, name } = req.params;

    const result = await client.db("rent-users").collection(name).deleteOne({ _id: ObjectId(id) }, (err, msg) => {
        if (msg) {
            res.status(200).send(msg);
        } else {
            res.send(err)
        }
    })
})
usersRouter.get("/:name/rentals", async (req, res) => {
    const { name } = req.params


    const result = await client.db("rent-users").collection(name).find({}).toArray();
    res.send(result)
})
export default usersRouter