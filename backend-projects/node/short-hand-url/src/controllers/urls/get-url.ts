import { type Request, type Response, type NextFunction } from "express";

import { UrlModel } from "../../models/url";

import HttpError from "../../utils/HttpError";

export const getAllUrl = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await UrlModel.find({});

    if (!data) {
      throw new HttpError("no url found", 404);
    }

    res.status(200).json({ message: data });
  } catch (err) {
    next(err);
  }
};
