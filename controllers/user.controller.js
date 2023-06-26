const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const yup = require("yup");

const UserSchema = require("../models/user.schema");

const mongoose = require("../utils/mongoDB");
const { schemaValidator } = require("../utils/schemaValidator");
const { errorResponse } = require("../utils/errorHandler");

const saltRounds = 10;

module.exports.Signup = async (req, res) => {
  try {
    // Check Req Body has all the required fields
    const schema = yup.object().shape({
      email: yup.string().email().required("Email is required"),
      password: yup.string().required("Password is required"),
      username: yup.string().required("User name is required"),
    });

    // validate req body with schema
    let validation = await schemaValidator(req.body, schema);
    if (!validation.status) {
      return errorResponse(res, validation.error, 400);
    }

    const { email, password, username } = req.body;

    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return errorResponse(res, "User already exists.", 400);
    }

    const hashedPassword = await bcrypt.hash(password, Number(saltRounds));
    var user = new UserSchema({
      _id: new mongoose.Types.ObjectId(),
      email: email,
      password: hashedPassword,
      username: username,
    });

    await user.save();

    return res
      .status(200)
      .json({ message: "Successfully SignUp ! Now you can login" });
  } catch (err) {
    console.log(err);
    return errorResponse(res, "Something went wrong", 500, { error: err });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const schema = yup.object().shape({
      email: yup.string().email().required("Email is required"),
      password: yup.string().required("Password is required"),
    });

    // validate req body with schema
    let validation = await schemaValidator(req.body, schema);
    if (!validation.status) {
      return errorResponse(res, validation.error, 400);
    }

    const { email, password } = req.body;

    var user_doc = await UserSchema.findOne({ email });

    if (!user_doc) {
      return errorResponse(res, "This email is not registered", 404);
    }
    const isPasswordCorrect = await bcrypt.compare(password, user_doc.password);
    if (!isPasswordCorrect) {
      return errorResponse(res, "Invalid credentials", 400);
    }

    const token = jwt.sign(
      { email: user_doc.email, id: user_doc._id },
      process.env.JWT_TOKEN,
      { expiresIn: "23h" }
    );

    return res.status(200).json({
      id: user_doc["_id"],
      username: user_doc["username"],
      email: user_doc["email"],
      nameinitials: user_doc["nameinitials"],
      token,
    });
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Something went wrong", 500, { error: err });
  }
};

// change password
module.exports.ChangePassword = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return errorResponse(res, "Email and Password are required", 400);
    }

    const hashedPassword = await bcrypt.hash(password, Number(saltRounds));
    // update user password
    let user_doc = await UserSchema.findOneAndUpdate(
      { email },
      { password: hashedPassword, lastUpdated: Date.now() }
    );

    if (!user_doc) {
      return errorResponse(res, "User not found", 404);
    }

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    return errorResponse(res, "Something went wrong", 500, { error: err });
  }
};
