const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")

router.post('/meddata', async (req, res)=>{
    try{
        // console.log(global.products)
        // console.log(global.medicine_category)
        const fetched_data = await mongoose.connection.db.collection("products").find({}).toArray();
        const medCategory = await mongoose.connection.db.collection("medicine_categories").find({}).toArray();
        
        res.send([fetched_data, medCategory]);
    }catch(err){
        console.error("error : " + err.msg);
        res.send("Server Error")
    }
})

module.exports = router;