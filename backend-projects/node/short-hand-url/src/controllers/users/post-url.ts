import { type RequestHandler } from "express";
import shortid from 'shortid'

import { UrlModel } from "../../models/user";

import HttpError from "../../utils/http.error";

export const postUrl: RequestHandler = async (req, res, next) => {
  try {
    const { redirectUrl } = req.body;

    if (!redirectUrl) {
      throw HttpError.from('url not found', 404)
    }
    const shortId = shortid.generate()

    const result = await UrlModel.create({
      shortId,
      redirectUrl,
      visitHistory: []
    })

    res.send({ result })
  } catch (err) {
    next(err)
  }

}