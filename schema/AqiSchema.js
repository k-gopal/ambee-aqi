import Joi from "joi";

const aqiSchema = Joi.object().keys({
    pollutant: Joi.string().required(),
    concentration: Joi.number().required()
});

export default aqiSchema;