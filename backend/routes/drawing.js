import express from "express";
const router = express.Router();
import Drawing from "../models/drawing.js";

router.get("/", (req,res) => {
    Drawing.findOne({
        roomId: req.query.roomId,
        round: req.query.round,
        username: req.query.username
    })
    .then(drawings => res.status(200).json(drawings))
    .catch(error => res.status(400).json({ error }));
})

router.post("/", (req,res) => {
    const drawing = new Drawing(req.body);
    drawing.save().then(() => {
        res.status(201).json({
            message: 'Drawing saved successfully'
        })
    }).catch(error => {
        res.status(400).json({
            error: error
        })
    })
})

router.put("/", (req,res) => {
    Drawing.findOneAndUpdate({
        roomId: req.query.roomId,
        round: req.query.round,
        username: req.query.username
    }, {
        $set: {'strokes': req.body.strokes}
    }, {
        new: true
    }, (error, drawing) => {
        if (error) return error;
        res.json({ msg: "Drawing updated successfully" });
    })
})

router.delete("/", (req,res) => {
    res.send('Delete a user')
})

export default router;