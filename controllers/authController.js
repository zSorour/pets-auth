const HttpError = require("../models/HTTPError");
const PetOwner = require("../models/PetOwner");

const jwt = require("jsonwebtoken");

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
