import express from "express";
import {categories,get_categories,add_product,get_product,filter_product,get_product_count} from "../controller/user.js"
import { verifyUser } from "../middleware/auth.js";


const router=express.Router()

router.post("/categories",categories)
router.post("/add_product",add_product)
router.get("/get_categories",get_categories)
router.get("/get_product",get_product)

router.get("/filter_product",filter_product)
router.get("/get_product_count",get_product_count)

export default router