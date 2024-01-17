import mongoose from "mongoose";



const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  });

  const Product = mongoose.model('Product', productSchema);

  export default Product