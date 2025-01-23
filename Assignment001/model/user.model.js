import mongoose from "mongoose"

//designing the schema for the user
const userSchema = new mongoose.Schema({
    username: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
}, { timestamps: true });

//creating a model that works with the schema designed
const userModel = mongoose.model("Users", userSchema);

//exporting the model
export default userModel
