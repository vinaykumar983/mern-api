const exp=require("express");
const expressAsyncHandler = require("express-async-handler");
let foodApp=exp.Router();
const verifyToken=require("./middlewares/verifyToken")

foodApp.use(exp.json());
foodApp.use(exp.urlencoded())

foodApp.post("/add-food",expressAsyncHandler(async(request,response)=>{
    let foodCollectionObject=request.app.get("foodCollectionObject");
    let food=request.body;
        await foodCollectionObject.insertOne(food);
        response.send({message:"Thank you for donating the food..."})
}))

foodApp.get('/find-food/:place',verifyToken,expressAsyncHandler(async(request,response)=>{
    let placeOfReceiver=request.params.place
    let foodCollectionObject=request.app.get("foodCollectionObject");
    let donarData=await foodCollectionObject.find({$and:[{place:placeOfReceiver},{user:"donor"}]}).toArray();
    response.send({message:"we have found donors in your area",payload:donarData});
}))


foodApp.delete('/del-food/:dphone',expressAsyncHandler(async(request,response)=>{
    let dphone=request.params.dphone;
    let foodCollectionObject=request.app.get("foodCollectionObject");
    await foodCollectionObject.deleteMany({phone:dphone})
    response.send({message:"Request deleted successfully"})
}))

module.exports=foodApp