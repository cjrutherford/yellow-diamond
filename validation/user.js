const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = {
  registerUser: data => {
    let errors = {};
    data.userName = !isEmpty(data.userName) ? data.userName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    if (!validator.isLength(data.userName, { min: 2, max: 30 })) {
      errors.userName = "Name must be between 2 and 30 characters";
    }
    if (validator.isEmpty(data.userName)) {
      errors.userName = "Name Field is Required";
    }
    if (validator.isEmpty(data.email)) {
      errors.email = "Email Field is Required";
    }
    if (!validator.isEmail(data.email)) {
      errors.email = "Email is invalid.";
    }
    if (validator.isEmpty(data.password)) {
      errors.password = "Password Field is Required";
    }
    if (!validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = "Password must be between 6 and 30 characters";
    }
    if (validator.isEmpty(data.password2)) {
      errors.password2 = "Confirm Password field is Required";
    }
    if (!validator.equals(data.password, data.password2)) {
      errors.password2 = "Passwords must match";
    }
    return { errors, isValid: isEmpty(errors) };
  },
  loginUser: data => {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    if (!validator.isLength(data.name, { min: 2, max: 30 })) {
      errors.name = "Name must be between 2 and 30 characters";
    }
    if (validator.isEmpty(data.email)) {
      errors.email = "Email Field is Required";
    }
    if (!validator.isEmail(data.email)) {
      errors.email = "Email is invalid.";
    }
    if (validator.isEmpty(data.password)) {
      errors.password = "Password Field is Required";
    }
    return { errors, isValid: isEmpty(errors) };
  }
};
