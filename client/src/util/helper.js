
  export const findTopLevelCategories = (categories) => {
    console.log(categories)

    return categories.filter(category => category.parentId === null||category.parentId===undefined);
  };
  

  export const findChildCategories = (categoryId,categories) => {
    return categories.filter(category => category.parentId === categoryId);
  };
  
  
  export const findParallelCategories = (categoryId,categories) => {
    const category = categories.find(category => category._id === categoryId);
    if (!category || !category.parentId) {
      return []; // If the category is top-level or doesn't exist, it has no parallel categories
    }
    return categories.filter(c => c.parentId === category.parentId && c._id !== categoryId);
  };
  
  // Example usage
  
  