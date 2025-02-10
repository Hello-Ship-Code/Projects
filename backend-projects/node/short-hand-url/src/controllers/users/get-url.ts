import { type RequestHandler } from "express"

import { UrlModel } from "../../models/user"

import HttpError from "../../utils/http.error"

export const basicGet: RequestHandler = async (_req, res, next) => {
  try {
    const result = await UrlModel.find({})

    if (!result || result?.length === 0) {
      throw HttpError.from('url not found!!!', 404);
    }
    res.send({ message: result })
  } catch (err) {
    next(err)
  }
}