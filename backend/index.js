import express from "express";
import productRoutes from "./routes/index.js";
import cors from "cors";

const app = express();

try {

} catch (error) {
    console.error('Connection error:', error);
}

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use('/products', productRoutes);

app.listen(5000, () => console.log('Server running at port 5000'));