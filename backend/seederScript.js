const productData = require("./data/products");
const categories = require("./data/category")
const connectDB = require("./db");
const Product = require("./model/Product");
const MedicineCategory = require("./model/MedicineCategory")
const multer = require("multer");
const upload = multer({dest:"uploads/"})


const importData = async () => {
  try {
    await Product.deleteMany({});
    await MedicineCategory.deleteMany({})
    await MedicineCategory.insertMany(categories);  
    await Product.insertMany(productData);
    
    console.log("Data Import Success");

    process.exit();
  } catch (error) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

module.exports = importData;
