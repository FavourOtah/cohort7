import userModel from "../model/user.model.js"
import bcrypt from "bcryptjs"

//function to register a new user
const registerUser = async (req, res) => {

    //obtains input from frontend via destructuring. The password is singled out because of hashing ahead 
    const { password, ...others } = req.body

    //hashing the password
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    //checking if user already exists 
    const isUser = await userModel.findOne({ email: others.email })
    if (isUser) {
        //return is used here so that if there is already an existing user, the code doesnt run any further
        return res.json({ message: "The email is already linked to an existing user" });
    };

    try {
        //next line saves the user to the database 
        const newUser = new userModel({ ...others, password: hashedPassword })
        await newUser.save();
        res.send("Account created successfully")
    } catch (error) { res.send("Something went wrong") }
};


//function that logs in a user
const loginUser = async (req, res) => {

    //getting the credentials from the frontend via destructuring
    const { email, password } = req.body;

    try {
        //ensuring the user provides complete and valid credentials
        if (!email || !password) { return res.json({ message: " Invalid/missing credentials" }) };

        //checking if user with the email provided exists
        const trueUser = await userModel.findOne({ email })
        if (!trueUser) { return res.json({ message: "The email provided is not associated with any account. Would you like to create an account with us?" }) }

        //verifying the password
        //this next line compares the password provided from the frontend and the password already stored in the database
        const isPasswordValid = bcrypt.compareSync(password, trueUser.password)

        if (!isPasswordValid) { return res.json({ message: "Incorrect password" }) };

        //returning the person's account if everything is valid
        return res.json(trueUser)
    } catch (error) {
        res.send("Something went wrong")

    }

};

//function to delete a users account
const deleteUser = async (req, res) => {

    //getting the email since each user has a unique email.
    const { email } = req.body;

    try {
        //finds the unique user associated to the email from the database and deletes it
        await userModel.findOneAndDelete({ email })
        res.send("Account successfully deleted")
    } catch (error) {
        res.send("Something went wrong")
    };

};


export default { registerUser, deleteUser, loginUser }