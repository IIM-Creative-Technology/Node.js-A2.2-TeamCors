import express from "express";
const router = express.Router();

import { MongoClient } from "mongodb";
const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);

router.get("/:drawingId", (req,res) => {
    res.json({
        instruction: "Un cheval sur la Lune",
        strokes: [{},{}]
    })
})

router.post("/", (req,res) => {
    uploadDrawing(req.body).catch(console.dir);
    res.send('Drawing added');
})

router.put("/", (req,res) => {
    res.send('Modify a user')
})

router.delete("/", (req,res) => {
    res.send('Delete a user')
})

async function uploadDrawing(doc) {
    try {
        const database = client.db("team-cors");
        const drawings = database.collection("drawings");
        const result = await drawings.insertOne(doc);
    } finally {
        await client.close();
    }
}

export default router;