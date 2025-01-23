import express from "express"
import controls from "../controllers/user.controllers.js"

//initializing an express router
const routes = express.Router();

routes.post("/register", controls.registerUser);
routes.post("/login", controls.loginUser);
routes.delete("/delete", controls.deleteUser)

export default routes;