const Tasks = require("../models/Tasks.models")


module.exports = async(req,res)=>{
    id = req.params.id
    const tasks = await Tasks.findById(id)
    tasks.completed = true
    await tasks.save()
    res.redirect("/")
}