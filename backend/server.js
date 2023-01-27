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
app.use("/api/user", userRoute)
app.use("/api/drawing", drawingRoute)
io.on("connection", (socket) => {
    console.log(socket.id);
    socket.emit("hello", "world!");
    socket.on("validateDrawing", (drawing) => {
        fetch('http://localhost:3000/api/drawing', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(drawing)
        })
    })
})