const express = require("express");
const router = express.Router();
const Product = require("../model/Product");
const multer = require('multer');
const path = require('path');

router.post('/createproduct', async (req, res) => {
    try {
        await Product.create({
            title: req.body.title,
            imgsrc: req.body.imgsrc,
            indication: req.body.indication,
            category: req.body.category,
            dosage: req.body.dosage,
            sideEffects: req.body.sideEffect,
            price: req.body.price,
            countInStock: req.body.countInStock
        }).then((data) => {
            console.log(data);
            res.json({ success: true });
        })
    } catch (e) {
        console.error(e);
        res.json({ success: false });
    }
})


router.post('/updateproduct/:id', async (req, res) => {
    try {
        let id = req.params.id;
        // const data = await Product.findOne({ _id: id });
        console.log(id);

        // console.log(req.body.user);


        await Product.findOneAndUpdate({ _id: id }, req.body.product)
            .then(() => {
                console.log("success");
                res.json({ success: true })
            })
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server Error" });
    }
})

router.post('/deleteproduct/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const data = await Product.findOne({ _id: id });
        console.log(id);
        if(!data){
            console.log("There is no such product available.")
            res.json({success : false})
        }

        // console.log(req.body.user);

        

        await Product.findOneAndDelete({ _id: id })
            .then(() => {
                console.log("success");
                res.json({ success: true })
            })
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server Error" });
    }
})








module.exports = router;