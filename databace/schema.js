const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password :String,
    verifiedEmail: Boolean
},{
    timestamps: true
})

const blogSchema = mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    title:String,
    category: String,
    author:String,
    content:String,
   
},{
    timestamps:true
})


const User =mongoose.model('User',userSchema)
const Blog =mongoose.model('Blog',blogSchema)


module.exports ={User,Blog}