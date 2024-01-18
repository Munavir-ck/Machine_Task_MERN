import React, { useState, useEffect } from "react";
import {
  filter_product,
  get_categories,
  get_product,
  get_product_count,
} from "../API/Services/clientService";
import { findChildCategories, findTopLevelCategories } from "../util/helper";
import SubcategoryList from "./subCategoryList";

const ProductListing = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [topLevelCategories, setTopLevelCategories] = useState([]);
  const [isReset,setIsReste]=useState(false)

  useEffect(() => {
    get_categories().then((data) => {
      setCategories(data);
    });

    get_product().then((data) => {
      setProducts(data.result);
    });
  }, [isReset]);

  useEffect(() => {
    if (categories.length > 0) {
      setTopLevelCategories(findTopLevelCategories(categories));
      if (topLevelCategories.length > 0) {
        get_product_count(topLevelCategories).then((data) => {
          setTopLevelCategories(data.data);
        });
      }
    }
  }, [categories,selectedCategory]);

  const handleCategoryChange = (category,categoryName) => {
    const subCategory = findChildCategories(category, categories);
   
    setSelectedSubcategories(subCategory);
    filter_product(category).then((data) => {
      setProducts(data);
    });
    setSelectedCategory(categoryName);
  };

  const handleReset = () => {
    
   if (selectedSubcategories.length>0||selectedCategory!=="") {
    setIsReste(!isReset)
    setSelectedCategory("")
    setSelectedSubcategories([])
   }
  };


  return (
    <div className="container mx-auto mt-8 p-4 bg-white rounded shadow-lg h-screen overflow-scroll">
      <h2 className="text-3xl font-bold mb-4">Product Listing Page</h2>
      <button
        onClick={handleReset}
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 font-bold"
      >
        Reset
      </button>

      {/* Category Filter - Horizontal List */}
      <div className="mb-6">
        {selectedCategory? <h1 className="font-bold text-4xl">
          {selectedCategory}  
        </h1>:
        <>
         <label className="text-sm">Select Category:</label>
        <div className="flex space-x-4 mt-2">
          <button
            onClick={() => handleCategoryChange("")}
            className={`p-2 border rounded-md ${
              selectedCategory === "" ? "bg-blue-500 text-white" : ""
            }`}
          >
            All Categories
          </button>
          {topLevelCategories.map((category) => (
            <button
              key={category.categoryId}
              onClick={() => handleCategoryChange(category.categoryId,category.categoryName)}
              className={`p-2 border rounded-md ${
                selectedCategory === category.categoryId
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
            >
              {category.categoryName} (
              <span className="text-red-600 font-bold">
                {category.productCount}
              </span>
              )
            </button>
          ))}
        </div>
        </>
        }
       
       
      </div>

      {/* Subcategory Filter */}
      {selectedSubcategories.length > 0 && (
        <div className="mb-6">
          <label className="text-sm">Select Subcategory:</label>
          <SubcategoryList
            subcategories={selectedSubcategories}
            categories={categories}
            setProducts={setProducts}
            setSubCategories={setSelectedSubcategories}
            setSelectedCategory={ setSelectedCategory}
          />
        </div>
      )}

      {/* Product List */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product) => (
          <li key={product._id} className="bg-gray-100 p-4 rounded shadow-md">
            {product.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListing;
