const router = require("express").Router()
const auth = require("../middleware/auth")
const Project = require("../models/projectModel")

router.post("/", auth, async (req, res) => {
    try {
        const { title } = req.body
        //validation
        if (!title) {
            return res.status(400).json({ message: "Not all fields have been entered." })
        }
        const newProject = new Project({
            title,
            userId: req.userId
        })
        const savedProject = await newProject.save()
        res.json(savedProject)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get("/", auth, async (req, res) => {
    const projects = await Project.find({ userId: req.user })
    console.log(projects)
    res.json(projects)
})

router.delete("/:id", auth, async (req, res) => {
    const project = await Project.findOne({ userId: req.user, _id: URLSearchParams.id })
    if (!project) {
        return res.status(400)
            .json({
                message: "No project found with provided ID and belongs to the current user"
            })
    }
    const deleteProject = await Project.findByIdAndDelete(req.params.id)
    res.json(deleteProject)


})
module.exports = router