const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const MONGO_URL_LINK=process.env.MONGO_URL
const connection=mongoose.connect(MONGO_URL_LINK)

module.exports=connection