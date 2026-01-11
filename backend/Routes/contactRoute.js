const express = require("express");
const router = express.Router();
const Contact = require('../model/Contact');
const mongoose = require("mongoose")

router.post('/contact', async (req, res) => {
    try {
        const { fullName, email, message, city, date } = req.body;
        let newContact = new Contact({
            fullName, email, message, city, date
        })
        newContact.save();
        console.log("newContact has been saved")
        res.json({success : true});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server Error" });
    }
})

router.post('/getcontact', async (req, res) => {
    try {
        const contacts = await mongoose.connection.db.collection("contacts").find({}).toArray();
        res.json({contact : contacts});
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server Error" });
    }
})

module.exports = router;