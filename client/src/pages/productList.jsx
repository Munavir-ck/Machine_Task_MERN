import React from 'react'
import Nav from '../Components/SideBar'
import ProductListing from '../Components/ProductList'


const ProductList = () => {
  return (
    <div className="flex h-screen overflow-hidden">
    <div className="w-1/6 "> {/* Set the width as needed */}
      <Nav />
    </div>
    <div className="flex-1">
      <ProductListing/>
    </div>
  </div>
  
  )
}

export default ProductList
