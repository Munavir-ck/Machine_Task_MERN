import categoryDb from "../model/category.js";
import productDb from "../model/product.js";
import mongoose from "mongoose";

const categories = async (req, res) => {
  try {
    const { name, parentId } = req.body;
    let newCategory;

    if (parentId) {
      const parentCategory = await categoryDb.findById(parentId);
      if (!parentCategory) {
        return res.status(404).json({ error: "Parent category not found" });
      }

      const newCategory = new categoryDb({
        name,
        parentId,
        products: [],
        subcategories: [],
      });
      await newCategory.save();

      // Update parentCategory to push the _id of the newCategory, not the object
      parentCategory.subcategories.push(newCategory._id);
      await parentCategory.save();
    } else {
      newCategory = new categoryDb({ name, products: [], subcategories: [] });
      await newCategory.save();
    }

    res.json(newCategory);
  } catch (error) {
    console.log(error);
  }
};

const get_categories = async (req, res) => {
  try {
    const categories = await categoryDb
      .find()
      .populate({
        path: "subcategories",
        populate: {
          path: "subcategories",
          model: "Category",
        },
      })
      .populate("products");

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const add_product = async (req, res) => {
  try {
    console.log(req.body);
    const product = await productDb.create(req.body);
    const productId = product._id;
    const categoryId = product.categoryId;

    const updatedCategory = await categoryDb.findByIdAndUpdate(
      categoryId,
      { $push: { products: productId } },
      { new: true } // To get the updated document after the update
    );

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const get_product = async (req, res) => {
  try {
    const result = await productDb.find();

    res
      .status(200)
      .json({ message: "User updated successfully", status: true, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const filter_product = async (req, res) => {
  try {
    const electronicsCategoryId = req.query.category;

    const electronicsCategory = await categoryDb
      .findById(electronicsCategoryId)
      .populate("subcategories")
      .exec();

    if (!electronicsCategory) {
      console.log("Electronics category not found");
    } else {
      const productIds = [];

      const extractProductIds = async (category) => {
        productIds.push(...category.products);

        const subcategories = category.subcategories.map((sub) =>
          sub instanceof mongoose.Types.ObjectId ? sub : sub._id
        );

        for (const subcategory of subcategories) {
          if (mongoose.Types.ObjectId.isValid(subcategory)) {
            try {
              const populatedSubcategory = await categoryDb
                .findById(subcategory)
                .populate("subcategories")
                .exec();

              await extractProductIds(populatedSubcategory);
            } catch (error) {
              console.error(error);
            }
          } else {
            // If it's a populated document, directly process it
            await extractProductIds(subcategory);
          }
        }
      };

      try {
        // Call the asynchronous function
        await extractProductIds(electronicsCategory);

        const products = await productDb.find({ _id: { $in: productIds } });

        res.status(200).json(products);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      }
    }
  } catch (error) {}
};

const get_product_count = async (req, res) => {
  try {
    const catIdArr = [];
    const productIdsByCategory = [];
    req.query.categories.forEach((category) => {
      catIdArr.push(category._id);
    });

    const categories = await categoryDb
      .find({ _id: { $in: catIdArr } })
      .populate("subcategories")
      .exec();
    const extractProductCounts = async (category, productCountsByCategory) => {
      productCountsByCategory.push(...category.products);

      // Check if subcategories are populated as documents or ObjectIDs
      const subcategories = category.subcategories.map((sub) =>
        sub instanceof mongoose.Types.ObjectId ? sub : sub._id
      );

      // Use a for...of loop to await each recursive call
      for (const subcategory of subcategories) {
        if (mongoose.Types.ObjectId.isValid(subcategory)) {
          try {
            const populatedSubcategory = await categoryDb
              .findById(subcategory)
              .populate("subcategories")
              .exec();

            await extractProductCounts(
              populatedSubcategory,
              productCountsByCategory
            );
          } catch (error) {
            console.error(error);
          }
        } else {
          await extractProductCounts(subcategory, productCountsByCategory);
        }
      }
      return productCountsByCategory;
    };

    const productCountsByCategory = [];

    await Promise.all(
      categories.map(async (category, index) => {
        const productIdsByCategory = [];
        const categoryName = category?.name;
        const productIds = await extractProductCounts(
          category,
          productIdsByCategory
        );

        productCountsByCategory.push({
          categoryId: category._id,
          categoryName,
          productCount: productIds.length,
        });
      })
    );

    console.log(productCountsByCategory);
    res.status(200).json({ data: productCountsByCategory });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export {
  categories,
  get_categories,
  add_product,
  get_product,
  filter_product,
  get_product_count,
};
