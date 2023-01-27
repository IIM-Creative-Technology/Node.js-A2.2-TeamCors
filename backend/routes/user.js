import express from "express";
const router = express.Router();


router.get("/", (req,res) => {
    res.json({
        name: "Fanny",
        lastName: "Gautier",
        email: "fanny@mail.com"
    })
});

router.post("/", (req,res) => {
    res.send('Post a new user')
})

router.put("/", (req,res) => {
    res.send('Modify a user')
})

router.delete("/", (req,res) => {
    res.send('Delete a user')
})


export default router;