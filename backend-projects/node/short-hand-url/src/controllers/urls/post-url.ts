// import { type Request, type Response, type NextFunction } from "express";
// import shortid from 'shortid'
// import { UrlModel } from "../../models/url";
// import HttpError from "../../utils/HttpError";
// export const postUrl = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { redirectUrl } = req.body;
//     if (!redirectUrl) {
//       throw new HttpError("no url found", 404);
//     }
//     const shortId = shortid.generate()
//     const result = await UrlModel.create({
//       shortId,
//       redirectUrl,
//       visitHistory: []
//     })
//     res.json({ result })
//   } catch (err) {
//     next(err);
//   }
// };
import { type RequestHandler } from "express";
import shortid from 'shortid'

import { UrlModel } from "../../models/url";

import HttpError from "../../utils/HttpError"

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