import Property from "../models/property-model.js";

export const createProperty = async (req, res, next) => {
  try {
    const propertylist = await Property.create(req.body);
    return res.status(201).json(propertylist);
  } catch (error) {
    next(error);
  }
};
