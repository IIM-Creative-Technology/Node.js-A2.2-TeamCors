import express from "express";
import Room from "../models/room.js";
import {Server} from "socket.io";
import http from "http";
const app = express();
const router = express.Router();




router.use(express.static("path/to/lobby.html"));

//app.use("/room", express.static("path/to/lobby.html"));


    router.get("/:id", async (req, res) => {
        const {id} = req.params;
        try {
            const room = await Room.findById(id);
            console.log(room)
            console.log(id)

            if (!room) {
                return res.status(404).json({error: "Room not found"});
            }
            // Add the user to the room
            const link = `/room/${room._id}`;
            res.json({link});

            //socket.join(room._id)


        } catch (error) {
            res.status(500).json({error});
        }
        //socket.join(id);

    });

    router.post("/create", async (req, res) => {
        const {name} = req.body;

        try {
            const room = await Room.create({name});
            const link = `/room/${room._id}`;

            res.json({link});



        } catch (error) {
            res.status(500).json({error});
        }

        //socket.join(name);

    })

    router.delete("/room/:id", (req, res) => {
        res.send('Delete a room')
    })



export default router;
