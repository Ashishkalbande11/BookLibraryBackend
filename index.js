import express from "express";
import dotenv from 'dotenv'
import connectDB from './connection/conn.js'
import userRoute from './routes/user.js'
import bookRoute from './routes/book.js'
import favouriteRoute from './routes/favourite.js'
import cartRoute from "./routes/cart.js"
import orderRoute from "./routes/order.js"
import cors from 'cors'

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

//home route for testing
app.get("/", (req, res) => {
    res.send("Home Page");
    console.log("home page")
});

//middlewares
app.use(cors());
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", bookRoute);
app.use("/api", favouriteRoute);
app.use("/api", cartRoute);
app.use("/api", orderRoute);

//connect to MongoDB
connectDB(MONGO_URI)
    .then(()=>{
        app.listen(PORT, () => {
            console.log(`Server is active on ${PORT}`);
        });
    })
    .catch((error) => console.log(error.message));