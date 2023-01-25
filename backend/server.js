import express from "express";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import cors from "cors";
import * as http from "http";

const app= express();
const server = http.createServer(app);
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

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

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.emit("hello", "world!");
})