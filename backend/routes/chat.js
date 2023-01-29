import express from "express";
const router = express.Router();


router.get("/messages", (req,res) => {
    /*TODO*/
})

router.get("/messages/:id", (req,res) => {
    /*TODO*/

})



router.post("/messages", (req,res) => {
    res.send('Post a new message')
})

router.put("/messages/:id", (req,res) => {
    res.send('Modify a message')
})

router.delete("/messages/:id", (req,res) => {
    res.send('Delete a message')
})


export default router;