import express from "express";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import cors from "cors";
import * as http from "http";
import userRoute from './routes/user.js'
import drawingRoute from "./routes/drawing.js";

const app = express();
const server = http.createServer(app);
const port = 3000;

let method;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/drawing", drawingRoute)

const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.emit("hello", "world!");
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
})