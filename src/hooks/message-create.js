const { NotFound, GeneralError, BadRequest } = require('@feathersjs/errors');
const Joi = require("joi");

// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const schema = Joi.object().keys({
      fromID: Joi.number().integer().required(),
      toID: Joi.number().integer().required(),  
      text: Joi.string().required()
    })

    const result = Joi.validate(context.data, schema);
    if (result.error !== null) {
      throw new BadRequest(result.error.details[0].message);
    }

    context.data.created = new Date().getTime();
    
    return context;
  };
};
