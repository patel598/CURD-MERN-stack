import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";


// routes
import AuthRoute from './routes/AuthRoute.js';
import ProductRoute from './routes/ProductsRoute.js';
import OrderRoute from './routes/OrderRoute.js';



const app = express();



// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());



// to serve images inside public folder
app.use(express.static('public'));
app.use('./uploads/user', express.static('user'));



dotenv.config();
const PORT = process.env.PORT;



app.use('/', AuthRoute);
app.use('/', ProductRoute)
app.use('/', OrderRoute)



const CONNECTION = process.env.MONGODB_CONNECTION;
mongoose
  .connect(CONNECTION)
  .then(() => app.listen(PORT, () => console.log(`Listening at Port ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));





