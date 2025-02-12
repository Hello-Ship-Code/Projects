import { RequestHandler } from "express";

import HttpError from "../../utils/HttpError";

export const getUrlById: RequestHandler = async (req, res, next) => {
  try {
    const shortId = req.params.shortId;
    if (!shortId) {
      throw new HttpError('url not found', 404)
      return
    }

  } catch (error) {
    next(error);
  }

}