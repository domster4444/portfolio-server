const Joi = require('joi');
const registrationValidation = (formData) => {
  const schema = Joi.object({
    firstName: Joi.string().required().max(20),
    lastName: Joi.string().required().max(20),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  });
  return schema.validate(formData); //? if formData not valid then return error
};

const loginValidation = (formData) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  });
  return schema.validate(formData);
};

module.exports = { registrationValidation, loginValidation };
