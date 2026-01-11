const express = require("express");
const router = express.Router();
const Product = require("../model/Product");

router.post("/:name", async(req, res) => {
  try{
    let name = req.params.name;
    
    const products = await Product.find({category : name})
    // console.log(products)
    res.json({products})
    // res.send([products]);
  }catch(error){
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
})

module.exports = router;
