import express from "express";
 
import { 
    getAllProducts,
    getAllState
} from "../controllers/Products.js";
 
const router = express.Router();
 
router.post('/', getAllProducts);
router.get('/getAllState', getAllState);
 
export default router;