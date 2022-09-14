import { MongoClient } from 'mongodb';
const uri = 'mongodb+srv://Admin:ZipDAO!@cluster0.rxgkmuu.mongodb.net/ZipDAO';
const db = new MongoClient(uri);
const zipdao = db.db('ZipDAO');

// import mongoose from 'mongoose';
// const uri = 'mongodb+srv://Admin:ZipDAO!@cluster0.rxgkmuu.mongodb.net/ZipDAO';
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// const db = new Sequelize('mern_db', 'root', '', {
//     host: "localhost",
//     dialect: "mysql"
// });
export default zipdao;