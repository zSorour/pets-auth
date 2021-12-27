const HttpError = require("../models/HTTPError");
const PetOwner = require("../models/PetOwner");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.signIn = async (req, res, next) => {
  const { username, password } = req.body;

  let user;

  try {
    user = await PetOwner.findOne({ username: username }).select("+password");
  } catch (err) {
    const error = new HttpError(
      "Signing in has failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      401
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, user.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: user.id, username: user.username },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    userId: user.id,
    username: user.username,
    token: token
  });
};

module.exports.signUp = async (req, res, next) => {
  const { username, password, email, name, address, phone } = req.body;

  let user;
  try {
    user = await PetOwner.findOne({ username: username });
  } catch (err) {
    const error = new HttpError(
      "Signing up process failed, please try again later.",
      500
    );
    return next(error);
  }

  if (user) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Error creating user, please try again later.",
      500
    );
    return next(error);
  }

  const newUser = new PetOwner({
    username,
    password: hashedPassword,
    email,
    name,
    address,
    pets: [],
    phone,
    location: {
      lat: 0,
      lng: 0
    }
  });

  try {
    await newUser.save();
  } catch (err) {
    const error = new HttpError(
      "111Signing up process failed, please try again later.",
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userID: newUser.id,
        username: newUser.username
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Signing up process failed, please try again later.",
      500
    );
    return next(error);
  }

  res.status(201).send({
    userID: newUser.id,
    username: newUser.username,
    token
  });
};
