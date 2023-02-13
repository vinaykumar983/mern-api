const exp=require("express");
const expressAsyncHandler = require("express-async-handler");
let bcryptjs=require("bcryptjs");
let userApp=exp.Router();
let jwt=require("jsonwebtoken")

require("dotenv").config();
userApp.use(exp.json());
userApp.use(exp.urlencoded())

userApp.post("/create-user",expressAsyncHandler(async(request,response)=>{
    let userCollectionObject=request.app.get("userCollectionObject");
    let newUser=request.body;
    console.log(newUser)
    let userOfDb=await userCollectionObject.findOne({username:newUser.username});
    if(userOfDb!=undefined){
        response.send({message:"Please choose another username..."})
    }
    else{
        let hashedPassword=await bcryptjs.hash(newUser.password,5);
        newUser.password=hashedPassword;
        await userCollectionObject.insertOne(newUser);
        response.send({message:"Registeration successful..."})
    }
}))

userApp.post('/login',expressAsyncHandler(async(request,response)=>{
    let userCollectionObject=request.app.get("userCollectionObject");
    let userObj=request.body;
    let userOfDb=await userCollectionObject.findOne({username:userObj.username})
    if(userOfDb==null){
        response.send({message:"Invalid user"});
    }
    else{
        let status=await bcryptjs.compare(userObj.password,userOfDb.password)
        if(status==false){
            response.send({message:"Invalid password"});
        }
        else{
            let token=jwt.sign({username:userOfDb.username}, process.env.KEY ,{expiresIn:3600})
            response.send({message:"success", payload:token ,userObj:userOfDb})
        }
    }
}))


userApp.post("/query",expressAsyncHandler(async(request,response)=>{
    let userCollectionObject=request.app.get("userCollectionObject");
    let data=request.body;
        await userCollectionObject.insertOne(data);
        response.send({message:"success"})
}))


module.exports=userApp