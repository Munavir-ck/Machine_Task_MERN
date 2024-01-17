import React, { useState, useEffect } from "react";
import { addProduct, get_categories } from "../API/Services/clientService";
function ProductForm() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategory, setSububCategory] = useState(false);
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice),
      quantity: parseInt(productQuantity),
      categoryId: selectedCategory,
    };

    console.log(productData,33)
    addProduct(productData)
  };
  useEffect(() => {
    fetchCategories();
  }, []);


 
 

  const handleSelectChange=(e)=>{
    setSelectedCategory(e.target.value)
    // const categoryExists = categories.find(
    //     (category) => category._id === e.target.value
    //   );
  
    //   if (categoryExists) {
    //     if (
    //       categoryExists.subcategories &&
    //       categoryExists.subcategories.length > 0
    //     ) {
        
    //       setSububCategory(true)
    //       alert( `choose another category `)
    //       setSelectedCategory("")
          
         
    //     } else {
            
    //       console.log(
    //         `Category with ID ${selectedCategory} does not have subcategories.`
    //       );
    //     }
    //   } else {
    //     console.log(`Category with ID ${selectedCategory} does not exist.`);
    //   }
  }

  function fetchCategories() {
    get_categories().then((data) => {
      console.log("result", data);
      setCategories(data);
    });
  }
  return (
    <div className="bg-gray-200  rounded-md mb-4 p-14">
      <h3 className="text-lg font-bold mb-2">Add Product</h3>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="productName"
          >
            Product Name
          </label>
          <input
            className="border rounded w-full py-2 px-3"
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="productDescription"
          >
            Description
          </label>
          <input
            className="border rounded w-full py-2 px-3"
            type="text"
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="productPrice"
          >
            Price
          </label>
          <input
            className="border rounded w-full py-2 px-3"
            type="number"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="productQuantity"
          >
            Quantity
          </label>
          <input
            className="border rounded w-full py-2 px-3"
            type="number"
            id="productQuantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="categorySelect"
          >
            Category
          </label>
          <select
            className="border rounded w-full py-2 px-3"
            id="categorySelect"
            value={selectedCategory}
            onChange={handleSelectChange}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
         
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          type="submit"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
