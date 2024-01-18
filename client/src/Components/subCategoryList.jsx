// SubcategoryList.js
import React, { useEffect, useState } from "react";
import { filter_product, get_product_count } from "../API/Services/clientService";
import { findChildCategories } from "../util/helper";

const SubcategoryList = ({ subcategories, categories, setProducts,setSubCategories,setSelectedCategory }) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const[isSelect,setIsSelect]=useState("")

  useEffect(()=>{
    get_product_count(subcategories).then((data)=>{
      setSubCategories(data.data)
    })
  },[isSelect])
  

  const handleSubCategory = (category,categoryName) => {
    setIsSelect(category)
    setSelectedCategory(categoryName)
    console.log(selectedSubcategory , category,343434)
    const subCategory = findChildCategories(category, categories);
   
    setSubCategories(subCategory);
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
            onClick={() => handleSubCategory(subcategory.categoryId,subcategory.categoryName)}
            className={`mr-2 mb-2 px-4 py-2 ${
              isSelect === subcategory._id
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 border border-blue-500"
            } rounded cursor-pointer hover:underline focus:outline-none`}
          >
            {subcategory.categoryName}({subcategory.productCount})
          </button>
        ))}
      </div>
      {/* {selectedSubcategory && (
        <SubcategoryList
          subcategories={selectedSubcategory}
          categories={categories}
          setProducts={setProducts}
          setSubCategories={setSelectedSubcategory}

        />
      )} */}
    </div>
  );
};

export default SubcategoryList;






