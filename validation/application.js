const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = {
    registerApp: (data) => {
        const errors = {};
        data.appName = !isEmpty(data.appName) ? data.appName : "";
        data.appPass = !isEmpty(data.appPass) ? data.appPass : "";
        data.appPass2 = !isEmpty(data.appPass2) ? data.appPass2 : "";

        if (validator.isEmpty(data.appName)) {
            errors.appName = 'App Name is Required';
        }
        if (validator.isEmpty(data.appPass)) {
            errors.appPass = 'A Password is required to create an app.';
        }
        if (validator.isEmpty(data.appPass2)) {
            errors.appPass = 'Password Confirmation Required.';
        }

        return { errors, isValid: isEmpty(errors) };
    },
    loginApp: (data) => {
        const errors = {};
        data.appName = !isEmpty(data.appName) ? data.appName : "";
        data.appPass = !isEmpty(data.appPass) ? data.appPass : "";

        if(validator.isEmpty(data.appName)){
            errors.appName = 'App Name is Required';
        }

        if(validator.isEmpty(data.appPass)){
            errors.appPass = 'App Password is Required';
        }
        return {errors, isValid: isEmpty(errors)};
    },
};