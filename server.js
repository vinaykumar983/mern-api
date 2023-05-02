const exp=require("express");

let app=exp();

app.use(exp.json())

const mclient=require("mongodb").MongoClient;

require("dotenv").config

const path=require("path");

app.use(exp.static(path.join(__dirname,'./build')))


require("dotenv").config();

let DBurl=process.env.DBURL;

mclient.connect(DBurl)
.then((client)=>{
    let dbObj=client.db("food_donation");
    let userCollectionObject=dbObj.collection("userCollection");
    let foodCollectionObject=dbObj.collection("foodData");
    app.set("userCollectionObject",userCollectionObject);
    app.set("foodCollectionObject",foodCollectionObject);
    console.log("DB connection successful");
})
.catch((error)=>{
    console.log("Error in db connection",error);
})

let userApp=require('./API/userApp')
let foodApp=require('./API/foodApp')

app.use('/user-api',userApp)
app.use('/food-api',foodApp)

app.use('*',(request,response)=>{
    response.sendFile(path.join(__dirname,'./build/index.html'))
})


app.use((request,response,next)=>{
    response.send({message:`path ${requsest.url} is invalid`})
})
app.use((error,request,response,next)=>{
    response.send({message:error.message})
})

const PORT=process.env.PORT || 4000;




app.listen(PORT,()=>{
    console.log("server listening on port number 4000")
})