import express from "express";
import { ObjectId } from "mongodb";
import { client } from "./index.js";

const productsRouter = express.Router()
productsRouter.get("/cameras", async (req, res) => {
    const data = await client.db("rent-products").collection("cameras").find({}).toArray()
    res.send(data)
})
productsRouter.get("/cameras/:_id", async (req, res) => {
    const { _id } = req.params;
    const data = await client.db("rent-products").collection("cameras").findOne({ "_id": ObjectId(_id) })
    res.send(data)
})
productsRouter.get("/gagets/:_id", async (req, res) => {
    const { _id } = req.params;
    const data = await client.db("rent-products").collection("gagets").findOne({ "_id": ObjectId(_id) })
    res.send(data)
})
productsRouter.get("/gagets", async (req, res) => {
    const data = await client.db("rent-products").collection("gagets").find({}).toArray()
    res.send(data)
})
export default productsRouter