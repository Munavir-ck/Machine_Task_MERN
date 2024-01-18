import "./App.css";



import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProductListingPage from "./Components/productListing";
import AddCategory from "./pages/addCategory";
import AddProduct from "./pages/addProduct";
import ProductList from "./pages/productList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/products" element={<AddProduct/>} />

          <Route path="/" element={<AddCategory />} />
          <Route path="/product_list" element={<ProductList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
