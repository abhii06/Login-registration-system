const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }, 
    dob: { type: Date, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, { expiresIn: "7d" }); // Corrected token generation
    return token;
};

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        dob: Joi.date().required().label("Date of Birth"),
        email: Joi.string().required().label("Email"), // Fixed property name here
        password: Joi.string().required().label("Password"), // Fixed property name here
        
    });
    return schema.validate(data);
}

const User = mongoose.model('User', userSchema); // Defined the User model based on the userSchema

module.exports = { User, validate };
