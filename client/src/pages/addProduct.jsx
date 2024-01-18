import React from 'react'
import ProductForm from '../Components/productForm'
import Nav from '../Components/SideBar'


const AddProduct = () => {
  return (
    <div className="flex">
    <div className="w-1/6"> {/* Set the width as needed */}
      <Nav />
    </div>
    <div className="flex-1  md:px-40">
      <ProductForm/>
    </div>
  </div>
  
  )
}

export default AddProduct
