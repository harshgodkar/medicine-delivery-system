const express = require("express");
const router = express.Router();
const Order = require("../model/Orders");
const User = require("../model/user");

router.post("/orderData", async (req, res) => {
    let data = req.body.order_data;
    let email = req.body.email;
    await data.splice(0, 0, { Order_date: req.body.order_date });

    let e = await Order.findOne({ 'email': email });
    if (e === null) {
        try {
            await Order.create({
                email: email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (err) {
            console.log(err.message);
            res.send("Server error", err.message);
        }
    }
    else {
        try {
            await Order.findOneAndUpdate({ email: email }, {
                $push: { order_data: data }
            }).then(() => {
                res.json({ success: true })
            })
        } catch (err) {
            console.log(err.message);
            res.send("Server error", err.message);
        }
    }
})

router.post('/myOrder', async (req, res) => {
    try {
        let data = await Order.findOne({ 'email': req.body.email });
        if (data == null) {
            // console.log("not ordered");
            res.json({success : false});
        }
        else {

            let user = await User.findOne({ 'email': req.body.email });
            // console.log(data.order_data);
            // console.log(user.name);
            // res.json({user : user});
            res.json({ orderData: data.order_data, name: user.name, success : true });
        }
    } catch (err) {
        console.log(err.message);
        res.send("Server error", err.message);
    }
})

module.exports = router;