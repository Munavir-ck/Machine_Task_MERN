// SubcategoryList.js
import React, { useState } from "react";
import { filter_product } from "../API/Services/clientService";
import { findChildCategories } from "../util/helper";

const SubcategoryList = ({ subcategories, categories, setProducts }) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const handleSubCategory = (category) => {
    const subCategory = findChildCategories(category, categories);
    setSelectedSubcategory(subCategory);
    filter_product(category).then((data) => {
      setProducts(data);
    });
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2 text-blue-500">Subcategories:</h3>
      <div className="flex flex-wrap">
        {subcategories.map((subcategory) => (
          <button
            key={subcategory._id}
            onClick={() => handleSubCategory(subcategory._id)}
            className={`mr-2 mb-2 px-4 py-2 ${
              selectedSubcategory === subcategory._id
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 border border-blue-500"
            } rounded cursor-pointer hover:underline focus:outline-none`}
          >
            {subcategory.name}
          </button>
        ))}
      </div>
      {selectedSubcategory && (
        <SubcategoryList
          subcategories={selectedSubcategory}
          categories={categories}
          setProducts={setProducts}
        />
      )}
    </div>
  );
};

export default SubcategoryList;






