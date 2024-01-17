
import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
    name: String,
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  });

  const Category = mongoose.model('Category', categorySchema);

  export default Category