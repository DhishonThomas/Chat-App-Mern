import asyncHandler from "express-async-handler";
import User from "../Models/userModel";
import { generateToken } from "../config/jwtUtils";
import { hashedPssword } from "../config/passwordManager";
import { Request } from "express";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  console.log(name, email, password, pic);

  if (!name || !email || !password || !pic) {
    console.log("worked");
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const passwordHash = await hashedPssword(password);
  console.log(passwordHash);

  const user = await User.create({
    name,
    email,
    password: passwordHash,
    pic,
  });
  console.log(user);

  console.log(user._id);

  const token = await generateToken({ _id: user._id });

  console.log(token);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("Failed to Create the User");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  res.send(users);
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: await generateToken({ _id: user._id }),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});
export { registerUser, authUser, allUsers };
