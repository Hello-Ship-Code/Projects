import { type RequestHandler } from "express"
import shortid from 'shortid'

import { Url } from "../models/user";

type TypeHandler = RequestHandler<{ shortId: string }, {
  status: string;
  message: string;
  Data?: object;
  totalClicks?: number
}, never, never>

type PostUrlHandler = RequestHandler<never, {
  status: string;
  message: string;
  Data?: object;
}, {
  redirectUrl: string
}, never>

export const postUrl: PostUrlHandler = async (req, res) => {
  const { redirectUrl } = req.body;
  console.log(redirectUrl)
  if (!redirectUrl) {
    res.status(400).json({ status: "error", message: "URL is required" });
    return
  }

  const shortID = shortid.generate();

  await Url.create({
    shortID,
    redirectUrl, // Make sure this matches the Mongoose model
    visitedHistory: [],
  });

  // ✅ Fetch all stored URLs
  const allUrls = await Url.find({});

  // ✅ Pass allUrls to the template (instead of `redirectUrl`)
  res.render('home', { redirectUrl: allUrls });

}

export const getAllData: TypeHandler = async (_req, res): Promise<void> => {
  try {
    const result = await Url.find({});

    if (!result || result.length === 0) {
      res.render('home', { message: "error" })
      return
    }
    res.render('home', { redirectUrl: result });
    // res.json({ status: "success", message: "data working", Data: result })

  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

export const getUrlByID: TypeHandler = async (req, res) => {
  try {
    const result = await Url.findOneAndUpdate(
      { shortID: req.params.shortId },
      { $push: { visitHistory: { timeStamp: Date.now() } } },
      { new: true });

    if (!result) {
      res.status(400).json({ status: "error", message: "URL not found" })
      return
    }

    res.redirect(result.redirectUrl);

  } catch (error) {
    console.log(error)
    res.json({ status: "error", message: "Hello" })
  }
}

export const getAnalyticsById: TypeHandler = async (req, res) => {
  try {
    const shortID = req.params.shortId
    const result = await Url.findOne({ shortID })
    if (!result) {
      res.status(400).json({ status: "error", message: "analytics not found" })
      return
    }
    res.json({ status: "success", message: "analytics data", totalClicks: result.visitHistory.length, Data: result.visitHistory })

  } catch (error) {
    console.log("The Error: ", error)
    res.json({ status: "error", message: "server issue" })
  }
}
