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
      password: yup.string().min(8).required("Password is required"),
      firstName: yup.string().required("First name is required"),
      lastName: yup.string(),
    });

    // validate req body with schema
    let validation = await schemaValidator(req.body, schema);
    if (!validation.status) {
      return errorResponse(res, validation.error, 400);
    }

    const { email, password, firstName, lastName } = req.body;

    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return errorResponse(res, "User already exists.", 400);
    }

    const hashedPassword = await bcrypt.hash(password, Number(saltRounds));
    var user = new UserSchema({
      _id: new mongoose.Types.ObjectId(),
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
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
