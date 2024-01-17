import React, { useState, useEffect } from "react";
import {
  filter_product,
  get_categories,
  get_product,
  get_product_count,
} from "../API/Services/clientService";
import { findChildCategories, findTopLevelCategories } from "../util/helper";
import SubcategoryList from "./subCategoryList";

const ProductListingPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [topLevelCategories, setTopLevelCategories] = useState([]);

  useEffect(() => {
    get_categories().then((data) => {
      setCategories(data);
    });

    get_product().then((data) => {
      setProducts(data.result);
    });
    
   

  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setTopLevelCategories(findTopLevelCategories(categories));
      if(topLevelCategories.length>0){     
          get_product_count(topLevelCategories).then((data)=>{
            console.log(data.data)
            setTopLevelCategories(data.data)
          })
      }
    }


 
  }, [categories,]);

  const handleCategoryChange = (category) => {
    const subCategory = findChildCategories(category, categories);
    setSelectedSubcategory(subCategory);
    filter_product(category).then((data) => {
      setProducts(data);
    });
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto mt-8 p-4 bg-white rounded shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Product Listing Page</h2>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="text-sm">Select Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="block w-full p-2 mt-1 border rounded-md"
        >
          <option value="">All Categories</option>
          {topLevelCategories.map((category) => (
            <option className="font-bold" key={category.categoryId} value={category.categoryId}>
              {category.categoryName}<span className="text-red-600 font-bold">( {category.productCount} )</span>
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory Filter */}
      {selectedSubcategory.length > 0 && (
        <div className="mb-6">
          <label className="text-sm">Select Subcategory:</label>
          <SubcategoryList
            subcategories={selectedSubcategory}
            categories={categories}
            setProducts={setProducts}
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

export default ProductListingPage;


