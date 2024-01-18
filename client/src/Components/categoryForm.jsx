
import React, { useEffect, useState } from "react";
import { toast,ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { addCategory, get_categories } from "../API/Services/clientService";
import 'react-toastify/dist/ReactToastify.css';
const Index = () => {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  

  useEffect(() => {
    fetchCategories();
  }, [parentCategory]);

  function fetchCategories() {
    get_categories().then((data) => {
      setCategories(data);
    });
  }

  async function saveCategory(ev) {
    ev.preventDefault();

    if (!name) {
      toast.warn("Please add a category name");
      return;
    }

    try {
      await addCategory(name, parentCategory);
      setName("");
      setParentCategory("");
    
      fetchCategories();
      Swal.fire({
        icon: "success",
        title: "Category Saved!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error("Error saving category. Please try again.");
    }
  }



 
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h1 className="text-2xl font-bold mb-4">Categories</h1>
        <ToastContainer/>
        <form onSubmit={saveCategory} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Category name"
              onChange={(ev) => setName(ev.target.value)}
              value={name}
              className="border rounded py-2 px-3"
            />
            <select
              onChange={(ev) => setParentCategory(ev.target.value)}
              value={parentCategory}
              className="border rounded py-2 px-3"
            >
              <option value="">No parent category</option>
              {categories.length > 0 &&
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Index;

