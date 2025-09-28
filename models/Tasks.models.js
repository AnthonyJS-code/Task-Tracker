const mongoose = require("mongoose");
const TaskSchema = mongoose.Schema(
    {
       task:{
        type:String,
        required:true,
        unique:true
       },
       user:{
        type:String,
        required:true
       },
       completed:{
        type:Boolean,
        default:false
       }
    },
    {
        timestamps: true,
    }
)
const Tasks = mongoose.model("Task",TaskSchema);
module.exports = Tasks