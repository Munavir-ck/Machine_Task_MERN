import axios from "axios";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { addCategory, get_categories } from "../API/Services/clientService";

const Index = () => {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, [parentCategory]);

  function fetchCategories() {
    get_categories().then((data) => {
      console.log("result", data);
      setCategories(data);
    });
  }
  async function saveCategory(ev) {
    ev.preventDefault();

    if (!name) {
      toast.warn("add category");
      return;
    }
    addCategory(name, parentCategory);
    setName("");
    setParentCategory("");
    setProperties([]);
    fetchCategories();
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }
  function handlePropertyNameChange(index, newName) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }
  function handlePropertyValuesChange(index, newValues) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }
  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }
  return (
    <>
      <div className="text-blue-900 flex justify-between ">
        <h2>
          Hello, <b>CK Production</b>
        </h2>
      </div>
      <div className="bg-bgGray shadow-2xl  mt-4 rounded-lg h-full p-10">
        <h1>Categories</h1>

        <label>{"Create new category"}</label>
        <form onSubmit={saveCategory}>
          <div className="flex gap-1">
            <input
              type="text"
              className=""
              placeholder={"Category name"}
              onChange={(ev) => setName(ev.target.value)}
              value={name}
            />
            <div className="flex flex-col space-y-2 ">
              <select
                onChange={(ev) => setParentCategory(ev.target.value)}
                value={parentCategory}
              >
                <option value="">No parent category</option>
                {categories.length > 0 &&
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>{" "}
              <button
                onClick={addProperty}
                type="button"
                className="btn-default text-sm mb-2 bg-primary text-white"
              >
                Add Parent category
              </button>
            </div>
          </div>
          <div className="mb-2">
            <label className="block">Properties</label>
            <button
              onClick={addProperty}
              type="button"
              className="btn-default text-sm mb-2"
            >
              Add new property
            </button>
            {properties.length > 0 &&
              properties.map((property, index) => (
                <div key={index} className="flex gap-1 mb-2">
                  <input
                    type="text"
                    name="property name"
                    onChange={(ev) =>
                      handlePropertyNameChange(index, ev.target.value)
                    }
                    value={property.name}
                    className="mb-0"
                    placeholder="property name (example: color)"
                  />
                  <input
                    type="text"
                    className="mb-0"
                    name="property value"
                    onChange={(ev) =>
                      handlePropertyValuesChange(index, ev.target.value)
                    }
                    value={property.values}
                    placeholder="values, comma separated"
                  />
                  <button
                    onClick={() => removeProperty(index)}
                    type="button"
                    className="btn-red"
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>
          <div className="flex gap-1">
            <button type="submit" className="btn-primary py-1">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Index;
