const express = require("express");
const router = express.Router();
const User = require('../model/user');


router.get('/getuser/:id', async (req, res) => {
    try {
        let id = req.params.id;
        //   console.log(id);
        const userdata = await User.findOne({ _id: id });
        // console.log(userdata);
        let data = {
            id: userdata._id,
            name: userdata.name,
            email: userdata.email,
            mobile: userdata.mobile,
            location: userdata.location
        }
        res.json(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
})

router.post('/updateuser/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const userdata = await User.findOne({ _id: id });
        // console.log(id);

        // console.log(req.body.user);

        let user = req.body.user;
        userdata.name = user.name;
        userdata.email = user.email;
        userdata.mobile = user.mobile;
        userdata.location = user.location;


        await User.findOneAndUpdate({ _id: id }, userdata)
            .then(() => {
                res.json({ success: true })
            })
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server Error" });
    }
})




module.exports = router;