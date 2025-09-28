const tasks = require("../models/Tasks.models")

module.exports = async (req,res)=>{
    id = req.params.id
    let person = await tasks.findByIdAndDelete(id)
    res.redirect("/")
}