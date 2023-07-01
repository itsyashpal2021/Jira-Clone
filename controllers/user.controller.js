const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const yup = require("yup");

const UserSchema = require("../models/user.schema");

const mongoose = require("../utils/mongoDB");
const { schemaValidator } = require("../utils/schemaValidator");
const { errorResponse } = require("../utils/errorHandler");

const saltRounds = 10;

module.exports.signInWithGoogle = async (req, res) => {
  try {
    // Check Req Body has all the required fields
    const schema = yup.object().shape({
      credential: yup.string().required("Credential is required"),
    });

    // validate req body with schema
    let validation = await schemaValidator(req.body, schema);
    if (!validation.status) {
      return errorResponse(res, validation.error, 400);
    }

    const info = jwt.decode(req.body.credential);
    const { email } = info;
    const user_doc = await UserSchema.findOne({ email });

    // check if it is a new user. if yes prompt for username
    if (!user_doc)
      return errorResponse(res, "New User, no username", 400, { email });

    // login the user
    const token = jwt.sign(
      { email: user_doc.email, id: user_doc._id },
      process.env.JWT_TOKEN,
      { expiresIn: "23h" }
    );

    return res.status(200).json({
      token,
    });
  } catch (err) {
    console.log(err);
    return errorResponse(res, "Something went wrong", 500, { error: err });
  }
};

module.exports.setUsername = async (req, res) => {
  try {
    // Check Req Body has all the required fields
    const schema = yup.object().shape({
      email: yup.string().email().required("email is required"),
      username: yup.string().required("username is required"),
    });

    // validate req body with schema
    let validation = await schemaValidator(req.body, schema);
    if (!validation.status) {
      return errorResponse(res, validation.error, 400);
    }

    const { email, username } = req.body;
    const user_doc = await UserSchema.findOne({ username });

    // check if username is available
    if (user_doc) return errorResponse(res, "username is not available", 400);
    const newUser = new UserSchema({
      _id: new mongoose.Types.ObjectId(),
      email: email,
      username: username,
      googleAuth: true,
    });
    await newUser.save();

    // login the user
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_TOKEN,
      { expiresIn: "23h" }
    );

    return res.status(200).json({
      token,
    });
  } catch (err) {
    console.log(err);
    return errorResponse(res, "Something went wrong", 500, { error: err });
  }
};

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

    const existingEmail = await UserSchema.findOne({ email });
    if (existingEmail) {
      return errorResponse(
        res,
        "An User with given email is already registered.",
        400
      );
    }

    const existingUser = await UserSchema.findOne({ username });
    if (existingUser) {
      return errorResponse(res, "Username not available.", 400);
    }

    const hashedPassword = await bcrypt.hash(password, Number(saltRounds));
    var user = new UserSchema({
      _id: new mongoose.Types.ObjectId(),
      email: email,
      password: hashedPassword,
      username: username,
    });

    await user.save();

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_TOKEN,
      { expiresIn: "23h" }
    );

    return res.status(200).json({
      token,
    });
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
    if (user_doc.googleAuth)
      return errorResponse(res, "Something went wrong", 500);

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

// check session
module.exports.checkSession = async (req, res) => {
  try {
    const { token } = req.body;
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
    const user = await UserSchema.findOne({ email: decodedToken.email });

    res.status(200).json({
      userDetails: {
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError)
      return errorResponse(res, "token expired", 400);

    console.log(err);
    return errorResponse(res, "Something went wrong", 500);
  }
};
