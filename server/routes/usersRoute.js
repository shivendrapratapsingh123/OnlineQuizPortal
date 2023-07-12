import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

//user registration

router.post("/register", async (req, res) => {
  try {
    //check if user already exits
    const userExits = await User.findOne({ email: req.body.email });
    if (userExits) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    //create new user
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      message: "user created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// user login
router.post("/login", async (req, res) => {
  try {
    //check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(500)
        .send({ message: "user does not exists", success: false });
    }
    //check password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res
        .status(500)
        .send({ message: "Invalid password", success: false });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.send({
      message: "User logged in successfully",
      success: true,
      data: token,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});


//get user info 
router.post("/get-user-info",authMiddleware,async(req,res) =>{
  try{
         const user = await User.findById(req.body.userId);
         res.send({
          message:"User info fetched successfully",
          success: true,
          data: user
         });
  }
  catch(error){
   res.status(500).send({
    message:error.message,
    data: error,
    success: false
   });
  }
});

export default router;



