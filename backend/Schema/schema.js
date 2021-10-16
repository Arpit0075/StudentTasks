const Joi = require("joi");

const schema = {
  registerSchema: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  }),
  loginSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  postTaskSchema: Joi.object({
    activity: Joi.string().required(),
    reference: Joi.string().required(),
    day: Joi.string().required(),
  }),
  postSolutionsSchema: Joi.object({
    activity: Joi.string().required(),
    reference: Joi.string().required(),
    solution: Joi.string().required(),
    day: Joi.string().required(),
  }),
  updateGradeSchema: Joi.object({
    grade: Joi.number().required(),
  }),
};
module.exports = schema;
