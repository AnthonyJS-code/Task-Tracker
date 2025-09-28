const htmlReader = require("../Methods/htmlReader")

module.exports = async(req,res)=>{
    data = await htmlReader("createAccount")
    res.send(data)
}