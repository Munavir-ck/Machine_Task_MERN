import axios from "../Axios";

export const addCategory = async (name,parentId) => {

  const value={
    name,parentId
  }
  


  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post("/categories", value, config);
    localStorage.setItem("token", response.data.token)
    return response.data;
  } catch (error) {
    console.log(error);
    console.log("error in clientRegister service");
  }
};
export const get_categories = async () => {

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    }
    try {
      const response = await axios.get("/get_categories" ,config);
      return response.data;
    } catch (error) {
      console.log(error);
      console.log("error in clientRegister service");
    }
  };

 export  const addProduct=async(product)=>{
    
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    }
    try {
        const response = await axios.post("/add_product" ,product,config);
        return response.data;
      } catch (error) {
        console.log(error);
        console.log("error in clientRegister service");
      }

  }
  export  const get_product=async(value)=>{
    
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      }
    try {
        const response = await axios.get("/get_product",config);
        return response.data;
      } catch (error) {
        console.log(error);
        console.log("error in clientRegister service");
      }

  }
  export  const filter_product=async(category)=>{
    
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      }
    try {
        const response = await axios.get("/filter_product",{params:{
          category
        }},config);
        return response.data;
      } catch (error) {
        console.log(error);
        console.log("error in clientRegister service");
      }

  }
  export  const get_product_count=async( categories)=>{
    
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      }
    try {
        const response = await axios.get("/get_product_count",{params:{
          categories
        }},config);
        return response.data;
      } catch (error) {
        console.log(error);
        console.log("error in clientRegister service");
      }

  }