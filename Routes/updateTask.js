const tasks = require("../models/Tasks.models")

module.exports = async(req,res)=>{
    const {updatetask,id} = req.body
    let dtasks = await tasks.findById(id)
    dtasks.task = updatetask
    dtasks.save()
    res.redirect("/")
}