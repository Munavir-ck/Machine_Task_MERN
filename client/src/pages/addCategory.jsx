import React from 'react';
import Nav from '../Components/SideBar';
import AddCategoryForm from '../Components/categoryForm';

const AddCategory = () => {
  return (
    <div className="flex">
    <div className="w-1/6"> {/* Set the width as needed */}
      <Nav />
    </div>
    <div className="flex-1">
      <AddCategoryForm />
    </div>
  </div>
  
  );
};

export default AddCategory;

