import Property from "../models/property-model.js";
import { errorHandler } from "../utils/error.js";

export const createProperty = async (req, res, next) => {
  try {
    const propertylist = await Property.create(req.body);
    return res.status(201).json(propertylist);
  } catch (error) {
    next(error);
  }
};
export const deleteProperty = async (req, res, next) => {
  const propertyExsist = await Property.findById(req.params.id);
  // console.log(req.params.id);
  if (!propertyExsist) return next(errorHandler(404, "Property Not  Found"));

  if (req.user.id !== propertyExsist.userRef)
    return next(errorHandler(401, " you can only delete you own propertylist"));
  try {
    await Property.findByIdAndDelete(req.params.id);
    return res.status(200).json("deleted successfully");
  } catch (error) {
    next(error);
  }
};
export const updateProperty = async (req, res, next) => {
  const list = await Property.findById(req.params.id);
  if (!list) return next(errorHandler(404, "No Proerties Found"));

  if (req.user.id !== list.userRef)
    return next(errorHandler(401, " You Can Only Update Your Own Properties"));
  try {
    const updatedata = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedata);
  } catch (error) {
    next(error);
  }
};
export const getProperty = async (req, res, next) => {
  try {
    const info = await Property.findById(req.params.id);
    if (!info) {
      return next(errorHandler(404, "Property not found"));
    }
    await res.status(200).json(info);
  } catch (error) {
    next(error);
  }
};
export const getPropertys = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Property.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
