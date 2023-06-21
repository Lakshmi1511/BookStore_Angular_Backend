const express=require('express')  //import express 

const cors=require('cors')  //import cors

//import  dataservice
const dataService=require('./service/dataService')


const app=express() //create application using express

//to parse the request
app.use(express.json())


app.listen(3000,()=>{
    console.log('listening to port 3000');
})
 
app.use(cors({
    origin:'http://localhost:4200'
}))
//import jwt
const jwt = require('jsonwebtoken')
//middleware creation
const jwtMiddleware = (req, res, next) => {
    try {//acess token from request body
        const token = req.headers['access_token']

        //verify the token with secretkey

        const data = jwt.verify(token, "secret123")
        console.log(data);

        next()
    }
    catch {
        res.status(422).json({
            status: false,
            message: "please login",
            statusCode: 404

        })

    }

}
// ==========================register===========================

//register api-http request post('http://localhost:3000/register',body)
app.post('/register',(req,res)=>{
  dataService.register(req.body.uname,req.body.pwd,req.body.mobile,req.body.email)
  .then((result)=>{
    //send result to client
     res.status(result.statusCode).json(result)
 // res.send('start to resolve register req')
 })
 })
//login
app.post('/login', (req, res) => {
    dataService.login(req.body.uname, req.body.pwd).then(result => {
        res.status(result.statusCode).json(result)
    })
})

// =======================adminRegister====================

//adminregister api-http requset post ('http://localhost:3000/adminRegister',body)
app.post('/adminRegister',(req,res)=>{
    console.log('inside admin register api');
    console.log(req.body);
   //get adminName,adminPswd,adminMobile,adminEmail
    dataService.adminRegister(req.body.adminName,req.body.adminPswd,req.body.adminMobile,req.body.adminEmail,req.body.adminimage)
   .then((result)=>{
       //send result to client
    res.status(result.statusCode).json(result)

   })
})


// ==========================adminLogin=====================

//adminLogin api-http request post('http://localhost:3000/adminLogin',body)
app.post('/adminLogin',(req,res)=>{
   console.log('inside adminlogin api');
   console.log(req.body);
   //get adminName,adminPswd 
   dataService.adminLogin(req.body.adminName,req.body.adminPswd)
   .then((result)=>{
       //send result to client
       res.status(result.statusCode).json(result)
   })
})

//api to get all the products
app.get('/all-products',(req,res)=>{
    dataService.getPrducts()
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})



//api  to add wislist products
app.post('/addtowishlist',(req,res)=>{
    dataService.addtowishlist(req.body.id,req.body.title,req.body.price,req.body.image,req.body.description).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
    )
})

// api to get to wishlist
app.get('/getwishlist',(req,res)=>{
    dataService.getwishlist()
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//api to delete wishlist product
app.delete('/deletewish/:id',(req,res)=>{
    dataService.deletewish(req.params.id).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
    )
})

//api to delete book
app.delete('/deletebook/:id',(req,res)=>{
    dataService.deletebook(req.params.id).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
    )
})
// ===========================add book=======================

//additem api - http request post('http://localhost:3000/addBook',body)
//router specific middleware -JWTMiddleware 

app.post('/addBook',(req,res)=>{
    console.log('inside addBook api');
    console.log(req.body);
    //get id,author,country,price,image,language,title,year
    dataService.AddBook(req.body.id,req.body.author,req.body.country,req.body.price,req.body.image,req.body.language,req.body.title,req.body.year)
    .then((result)=>{
    //send response to client
    res.status(result.statusCode).json(result)
    })
   
})


