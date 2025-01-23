import express from "express"
import userRoutes from "./routes/user.route.js"
import mongoose from "mongoose"


//initializing an express app
const app = express();

//next line establishes connection with our database
mongoose.connect("mongodb://localhost:27017/cohort7")
    .then(() => { console.log("Connection to database successful ") })
    .catch(() => { console.log("Something went wrong") })




app.use(express.json());



app.use("/api", userRoutes);

app.listen(7000, () => { console.log("Server is running") })