const mongoose = require('mongoose');

const medicineCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true, // Ensure each category name is unique
    trim: true,
  },
});

const MedicineCategory = mongoose.model('medicine_categories', medicineCategorySchema);

module.exports = MedicineCategory;
