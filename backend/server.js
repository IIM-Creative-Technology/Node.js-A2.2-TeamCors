import express from "express";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import cors from "cors";
import * as http from "http";
import userRoute from './routes/user.js'
import drawingRoute from "./routes/drawing.js";
import roomRoute from './routes/room.js'
import mongoose from "mongoose";

const app = express();
const app= express();
const server = http.createServer(app);
const port = 3000;

let method;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/drawing", drawingRoute)

app.get('/', (req, res) => {
    res.json({hello: "world!"});
})

const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
app.use("/api/user", userRoute)
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.emit("set username", socket.id);
    app.use("/api/user", userRoute);
    app.use("/api/room", roomRoute);
    socket.on('join room',(data)=>{
        socket.join(data.roomIde)
        console.log(data.roomIde)
        // SEND TO MONGODB
        socket.to(data.roomIde).emit("user entered", data.members);

    })

    socket.on("validateDrawing", (doc) => {
        fetch(`http://localhost:3000/api/drawing?roomId=${doc.roomId}&round=${doc.round}&username=${doc.username}`)
        .then(response => response.json())
        .then(data => {
            method = data === null ? 'POST':'PUT';
            fetch(`http://localhost:3000/api/drawing?roomId=${doc.roomId}&round=${doc.round}&username=${doc.username}`, {
                method,
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(doc)
            })
            .then(response => response.json())
            .then(data => console.log(data));
        });
    })

    socket.on('chat message', (data) => {
        console.log('message : ' + data);
        console.log(data);
        io.emit('chat message', data);
        /* + SEND THE MESSAGE TO THE DATABASE (MESSAGE TABLE WITH USER ID */
    });


})

