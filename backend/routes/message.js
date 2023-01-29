import express from "express";
import Room from "../models/room.js";
import Message from "../models/message.js";
const router = express.Router();


router.get("/", async (req,res) => {

})

router.get("/:id", (req,res) => {
    /*TODO*/

})


router.post("/create",    async(req,res) => {
    /*const { content } = req.body;
    try {
        const content = await Message.create({ content });
        res.json({content});

    } catch (error) {
        res.status(500).json({error});
    }*/

})



router.delete("/:id", (req,res) => {
    res.send('Delete a message')
})


export default router;