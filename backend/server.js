import express from "express";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import cors from "cors";
import * as http from "http";
import userRoute from './routes/user.js'
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
app.use("/api/user", userRoute)
io.on("connection", (socket) => {
    console.log(socket.id);
    socket.emit("hello", "world!");

    socket.on('chat message', (data) => {
        console.log('message : ' + data);
        console.log(data);
        io.emit('chat message', data);
        /* + SEND THE MESSAGE TO THE DATABASE (MESSAGE TABLE WITH USER ID */
    });

    socket.on('is typing',()=>{
        console.log('user is typing')
        socket.broadcast.emit('is typing')

    })

    socket.on('is not typing',()=>{

        socket.broadcast.emit('is not typing')

    })


})


