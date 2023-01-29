import express from "express";
import Room from "../models/room.js";
import {Server} from "socket.io";
import http from "http";
import Drawing from "../models/drawing.js";
const app = express();
const router = express.Router();




router.use(express.static("path/to/lobby.html"));

//app.use("/room", express.static("path/to/lobby.html"));


    router.get("/:id", async (req, res) => {
        const {id} = req.params;
        try {
            const room = await Room.findOne({id: id});
            console.log('rrom', room)
            console.log('id', id)

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
        const {id} = req.body;

        try {
            const room = await Room.create({id, members: []});

            res.json({members: room.members});



        } catch (error) {
            res.status(500).json({error});
        }

        //socket.join(name);

    })

    router.delete("/room/:id", (req, res) => {
        res.send('Delete a room')
    })

router.put("/",(req,res)=>{
    console.log(req.body);
    // Room.findOneAndUpdate({
    //     id : req.body.id
    // },
    // {
    //     $push: {'members': req.body.username}
    // },(error, drawing) => {
    //     if (error) return error;
    //     res.json({ msg: "Drawing updated successfully" });
    // })
    Room.findOneAndUpdate({
        id: req.body.id,
    }, {
        $push: {'members': req.body.username}
    }, {
        new: true
    }, (error, room) => {
        if (error) return error;
        res.json({ msg: "Drawing updated successfully" });
    })
})



export default router;
