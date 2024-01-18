import React, { useState, useEffect } from "react";
import { addProduct, get_categories } from "../API/Services/clientService";
import Swal from "sweetalert2";

import { toast,ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function ProductForm() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);
  const validateInput = (name, value) => {

    console.log(name,value)

    switch (name) {
      case 'name':
        setErrors((prevErrors) => ({
          ...prevErrors,
          name: value === '' ? 'Name must be at least 3 characters long' : '',
        }));
        break;
      case 'description':
        setErrors((prevErrors) => ({
          ...prevErrors,
          description: value === '' ? 'Description cannot be empty' : '',
        }));
        break;
      case 'price':
        setErrors((prevErrors) => ({
          ...prevErrors,
          price: value === '' ? 'Enter a price' : '',
        }));
        break;
      case 'quantity':
        setErrors((prevErrors) => ({
          ...prevErrors,
          quantity: value === '' ? 'Enter a quantity' : '',
        }));
        break;
      case 'categoryId':
        setErrors((prevErrors) => ({
          ...prevErrors,
          categoryId: value === '' ? 'Category is required' : '',
        }));
        break;
      default:
        break;
    }
  };
  

  const fetchCategories = async () => {
    try {
      const data = await get_categories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    setFormData({
      ...formData,
      [name]: value,
    });
    validateInput(name,value);

    console.log(errors,4545)

  }

    const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const hasErrors = Object.values(errors).some((error) => error.length > 0);

    console.log(errors)
    console.log(formData)
    if (hasErrors) {
   
   
      toast.error('Form has errors');
    } else {
 
      try {
        await addProduct(formData);
        Swal.fire({
          icon: "success",
          title: "Product Added!",
          text: "Your product has been successfully added.",
          width: 300,
          heightAuto: true,
        });
        clearForm();
      } catch (error) {
        console.error("Error adding product:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please try again.",
          width: 300,
          heightAuto: true,
        });
      }
     
      
    }
   
  };

  const clearForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      quantity: "",
      categoryId: "",
    });
  };
    return (
      <div
        className="bg-gray-200 rounded-md p-6 mt-4"
        style={{ maxWidth: "700px" }}
      >
        <ToastContainer/>
        <h3 className="text-lg font-bold mb-4">Add Product</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
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
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
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
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
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
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
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
              name="categoryId"
              value={formData?.categoryId}
              onChange={handleChange}
              required
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
