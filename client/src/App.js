import "./App.css";
import CategoryForm from "./Components/categoryForm";
import ProductForm from "./Components/productForm";


import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProductListingPage from "./Components/productListing";

function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/pro"
            element={<ProductForm/>}
          />

          <Route path="/" element={<CategoryForm />} />
          <Route path="/li" element={<ProductListingPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
