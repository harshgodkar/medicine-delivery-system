const express = require("express");
const router = express.Router();
const Product = require("../model/Product")

router.post("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    
    const product = await Product.findOne({ _id: id })
    // console.log(product)
    res.json({ product })
    // res.send([products]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
})

module.exports = router;
