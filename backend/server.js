import express from "express";
import bodyParser from "body-parser";
import * as http from "http";
import cors from "cors";
import userRoute from './routes/user.js';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express()
const server = http.createServer(app);
const port = 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use("/api/user", userRoute);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})