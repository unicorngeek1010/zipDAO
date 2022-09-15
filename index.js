import express from "express";
import productRoutes from "./routes/index.js";
import cors from "cors";
import path from 'path';
const server_port = process.env.PORT || 3000;
const host = '0.0.0.0';
const app = express();

try {

} catch (error) {
    console.error('Connection error:', error);
}

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
const __dirname = path.resolve(path.dirname(''));
const buildPath = path.join(__dirname, '.', 'production');
console.log(buildPath);
app.use(express.static(buildPath));
app.use('/products', productRoutes);

app.listen(server_port, host,  () => console.log(`Server running at port ${server_port}`));