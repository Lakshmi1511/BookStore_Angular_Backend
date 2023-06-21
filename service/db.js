//import mongoose
const mongoose=require('mongoose')

//define connection string, to connect node and mongodb
mongoose.connect('mongodb://127.0.0.1:27017/cart',{useNewUrlParser:true})

//model creation 
// const Product=mongoose.model('Product',{
//     id:Number,
//     title:String,
//     price:Number,
//     description:String,
//     image:String,
//     rating:{
//         rate:Number,
//         count:Number
//     }
// })
const Product=mongoose.model('Product',{
    id: Number,
    author: String,
    country: String,
    price:Number,
    image: String,
    language: String,
    link: String,
    pages: Number,
    title: String,
    year:Number
})
    
//model creation of wishlist

const Wishlist = mongoose.model('Wishlist',{
    id:Number,
   title:String,
    price:Number,
    description:String,
     image:String
})

const User=mongoose.model('User',{
    
    mobile:Number,
    email:String,
    pwd:Number,
    uname:String
})
const Admin = mongoose.model('Admin',{
    adminName:String,
    adminPswd:String,
    adminMobile:Number,
    adminEmail:String,
    adminimage:String
    })
//export the model

module.exports={
    Product,Wishlist,User,Admin
}