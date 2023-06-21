//to bring the databse
const db= require('./db')

//import jwt
const jwt = require('jsonwebtoken')
//get all the products from db,Product is the model name
//model creation
// =============Register==========================

//define logic to resolve register requset 
 register =(uname,pwd,mobile,email)=>{
    //check out mobile is existing in user collection of bank db
   return db.User.findOne({
      mobile
    }).then((result)=>{
      console.log(result);
  
  //if mobile is exist send response as "user already exist" to client
  if(result){
      return{
          statusCode:401,
          message:"user already exist"
      }
  }
  // if amobile dosnot exist create account memory db with database as its uname pswd and send response to register succesfull
   //to client
  else{
      const newUser = new db.User({
          uname,
          pwd,
          mobile,
          email
      })
      //to store data in mongodb
      newUser.save()
      //send response to index.js
      return{
          statusCode:200,
          message:"Register successfully"
      }
   }
    })
  }
//login logic

login=(uname,pwd)=>{
  
    return db.User.findOne({uname,pwd}).then(user=>{
     if(user){
         const token=jwt.sign({currentUser:uname},'secretkey123')
         return {
             statusCode:200,
             status:true,
             message:"Login succesfully",
            
             currentUser:user.uname,
             currentPwd:user.pwd,
             
             token
          }
           
         }
         else{
             return {
                 statusCode:401,
                 status:false,
                 message:"Incorrect Password or Username"
               }
 
         }
     }
    )
 }
     
 //=============================AdminRegister================

//define logic to resolve adminRegister requset
const adminRegister = (adminName,adminPswd,adminMobile,adminEmail,adminimage)=>{
    //check adminMobile is existing in admin collection of bank db
    return db.Admin.findOne({
        adminMobile
     }).then((result)=>{
        console.log(result);
    
    //if mobile is exist send response as "user already exist" to client
    if(result){
            return{
                statusCode:401,
                message:"Admin already exist"
            }
        }
    
    //if mobile is not exist create admin db with details as adminName,adminPswd,adminMobile,adminEmail 
    //and send response to "register succesfully to client"
    else{
        const newAdmin = new db.Admin({
            adminName,
            adminPswd,
            adminMobile,
            adminEmail,
            adminimage
        })
       // to store data in mongodb
        newAdmin.save()
        //send response to index.js
        return{
            statusCode:200,
            message:"Register successfully"
        }
    }
    })
    }
    
    
    
    /////===================================AdminLogin========================
    
    //define logic to resolve adminlogin request
    const adminLogin =(adminName,adminPswd)=>{
        return db.Admin.findOne({
            adminName,
            adminPswd
        }).then((result)=>{
           // user exist
            if(result){
        //  ======== generate token with payload as mobile=============
         const token = jwt.sign({
           adminlogin:adminName 
         },'supersecerateKey')
    
    
                return{
                    statusCode:200,
                    message:"Login successfully",
                     //sending loginned username to frontend
                     currentAdminname:result.adminName,
                     currentAdminPwd:result.adminpswd,

                    //   currentAname: result.adminName,
                    //send token to client
                    token,
                    //send admin name 
                    // currentAdminname:adminName 
                }
            }
            else{
                return{
                    statusCode:404,
                    message:"Invalid Username/password"
                }
            }
        })
    }
    
    
    
 
 
 
const getPrducts=()=>{
   return db.Product.find().then(
    (result)=>{
        if(result){
            return{
                status:true,
                statusCode:200,
                products:result
            }
        }
        else{
            return{
                status:false,
                statusCode:404,
                message:'no products found'
            }
        }
    }
   )
}


//to add wihslist content
const addtowishlist=(id,title,price,image,description)=>{
// data addedd to mongodb --- create a model in db.js

return db.Wishlist.findOne({id}).then(
    (result)=>{
        if(result){
            return{
                status:true,
                statusCode:200,
                message:'Product already exist'
            }
        }
        else{
            const newProduct= new db.Wishlist({id,title,price,image,description})
            newProduct.save()  //to save data in mongodb
            return {
                status:true,
                statusCode:200,
                message:'Product added to wishlist'
            }
        }
    }
    
)
  }

  //to get wihslist content
  const getwishlist=()=>{
return db.Wishlist.find().then(
    (result)=>{
        if(result){
            return{
                status:true,
                statusCode:200,
                products:result   //here we need the content not message so we created a new variable products 
            }
        }
        else{
            return{
                status: false,
            statusCode: 404,
            message:'Your wishlist is empty'
            }
        }
    }
)
  }


  //to delete wishlist content
  deletewish=(id)=>{
    return db.Wishlist.deleteOne({id}).then(
        (result)=>{
            if(result){
                // return{
                //     status:true,
                //     statusCode:200,
                //     products:result,
                //     message:"products removed"  //here we need the content not message so we created a new variable products 
                // }

                return db.Wishlist.find().then(
                    (result)=>{
                        if(result){
                            return{
                                status:true,
                                statusCode:200,
                                wishlist:result,
                                message:'product removed successfully'   //here we need the content not message so we created a new variable products 
                            }
                        }
                        else{
                            return{
                                status: false,
                            statusCode: 404,
                            message:'product not found'
                            }
                        }
                    }
                )
                

            }
            else{
                return{
                    status: false,
                statusCode: 404,
                message:'Your wishlist is empty'
                }
            }
        }
    )
    
  }
//to delete Book
deletebook=(id)=>{
    return db.Product.deleteOne({id}).then(
        (result)=>{
            if(result){
                // return{
                //     status:true,
                //     statusCode:200,
                //     products:result,
                //     message:"products removed"  //here we need the content not message so we created a new variable products 
                // }

                return db.Product.find().then(
                    (result)=>{
                        if(result){
                            return{
                                status:true,
                                statusCode:200,
                              
                                message:'book removed successfully'   //here we need the content not message so we created a new variable products 
                            }
                        }
                        else{
                            return{
                                status: false,
                            statusCode: 404,
                            message:'book not found'
                            }
                        }
                    }
                )
                

            }
            else{
                return{
                    status: false,
                statusCode: 404,
                message:'Invalid data'
                }
            }
        }
    )
    
  }
// deleteAc = (acno) => {
//     return db.User.deleteOne({ acno }).then(deleteCount => {
//         if (deleteCount) {
//             return {
//                 message: "user deleted",
//                 status: true,
//                 statusCode: 200
//             }
//         }
//         else {
//             return {
//                 message: "invalid user",
//                 status: false,
//                 statusCode: 404
//             }
//         }
//     })
// }// ===============================AddBook======================

//define logic to resolve addbook request
const AddBook = (id,author,country,price,image,language,title,year)=>{
    //check id is existing in Book collection 
    return db.Product.findOne({
        id
    }).then((result)=>{
        console.log(result);

//if id is exist send response as "book  already exist" to client
    if(result){
       return{
        statusCode:401,
        message:"Book Id Already Exist"
       }
     }
 //if id is not exist create admin db with details as adminName,adminPswd,adminMobile,adminEmail 
//and send response to "register succesfully to client"
    else{
       const newBook = new db.Product({
        id,
        author,
        country,
        price,
        image,
        language,
        title,
        year
       })

       //to store data in mongodb
       newBook.save()
       return{
        statusCode:200,
        message:"Book Added Successfully"
       }
      }   

    })

}

  
module.exports={
    register,login,adminLogin,adminRegister,getPrducts,addtowishlist,getwishlist,deletewish,AddBook,deletebook
}


