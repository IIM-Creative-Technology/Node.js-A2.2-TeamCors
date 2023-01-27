import express from "express";
import Room from "../models/room.js";
const router = express.Router();


router.get("/:id", (req,res) => {
    res.json({
        name: "les copains" ,
        maxPeople : 4,
        id :req.params.id
    })

});

router.post("/create", async (req,res) => {
    const { name } = req.body;
    try {
        // Create a new room in the database
        const room = await Room.create({ name });
        // Generate a link to join the room
        const link = `/rooms/${room._id}`;
        // Send the link to the client
        res.json({ link });

        //socket.emit("newRoom", { link });


    } catch (error) {
        res.status(500).json({ error });
    }
})

router.delete("/room/:id", (req,res) => {
    res.send('Delete a room')
})

export default router;