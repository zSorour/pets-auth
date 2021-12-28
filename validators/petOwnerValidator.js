const { check } = require("express-validator");

const passwordRegEx =
  /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,50}$/;

const phoneRegEx = /^01[0125][0-9]{8}$/;

module.exports.signUpValidator = () => [
  check("username").not().isEmpty().withMessage("Username cannot be empty."),
  check("email").isEmail().withMessage("Email is invalid"),
  check("password")
    .matches(passwordRegEx)
    .withMessage(
      "Password length must be between 8 and 50, containing at least 1 uppercase, 1 lowercase, 1 digit, and 1 special symbol, with no whitespaces"
    ),
  check("phone").matches(phoneRegEx).withMessage("Phone number is invalid")
];
