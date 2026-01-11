const mongoose = require("mongoose")
const uri = 'mongodb+srv://medicinedel:medi111@cluster0.ealimsm.mongodb.net/medicine?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        //fetching data from products`
        console.log("MongoDB connection SUCCESS");
        const fetched_data = await mongoose.connection.db.collection("products").find({}).toArray();
        const medCategory = await mongoose.connection.db.collection("medicine_categories").find({}).toArray();
        global.products = fetched_data;
        global.medicine_category = medCategory;

        // console.log(fetched_data);
        // console.log(global.products);

    } catch (error) {
        console.error("MongoDB connection FAIL : " + error.message);
        process.exit(1);
    }
};

//export default fetched_data;

module.exports = mongoDB;

