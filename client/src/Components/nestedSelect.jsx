import React, { useState } from 'react';

const CategorySelect = ({ categories, onSelectChange, level = 0 }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);
    onSelectChange(selectedCategoryId);
  };

  return (
    <div>
      <select value={selectedCategory} onChange={handleSelectChange}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>

      {selectedCategory && (
        <CategorySelect
          categories={categories.find((cat) => cat._id === selectedCategory)?.subcategories || []}
          onSelectChange={onSelectChange}
          level={level + 1}
        />
      )}
    </div>
  );
};

export default CategorySelect;
