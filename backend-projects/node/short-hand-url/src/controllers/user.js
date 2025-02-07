"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalyticsById = exports.getUrlByID = exports.getAllData = exports.postUrl = void 0;
const shortid_1 = __importDefault(require("shortid"));
const user_1 = require("../models/user");
const postUrl = async (req, res) => {
    const { url } = req.body;
    const shortID = (0, shortid_1.default)();
    const entry = await user_1.Url.create({
        shortID,
        redirectUrl: url,
        visitedHistory: []
    });
    res.json({ status: "success", message: "message sent to DataBase", Data: entry });
};
exports.postUrl = postUrl;
const getAllData = async (_req, res) => {
    const result = await user_1.Url.find({});
    if (!result) {
        res.json({ status: "error", message: "no users found" });
        // return
    }
    res.status(200).json({ status: "success", message: "test", Data: result });
};
exports.getAllData = getAllData;
const getUrlByID = async (req, res) => {
    try {
        const result = await user_1.Url.findOneAndUpdate({ shortID: req.params.shortId }, { $push: { visitHistory: { timeStamp: Date.now() } } }, { new: true });
        if (!result) {
            res.status(400).json({ status: "error", message: "URL not found" });
            return;
        }
        res.redirect(result.redirectUrl);
    }
    catch (error) {
        console.log(error);
        res.json({ status: "error", message: "Hello" });
    }
};
exports.getUrlByID = getUrlByID;
const getAnalyticsById = async (req, res) => {
    try {
        const shortID = req.params.shortId;
        const result = await user_1.Url.findOne({ shortID });
        if (!result) {
            res.status(400).json({ status: "error", message: "analytics not found" });
            return;
        }
        res.json({ status: "success", message: "analytics data", totalClicks: result.visitHistory.length, Data: result.visitHistory });
    }
    catch (error) {
        console.log("The Error: ", error);
        res.json({ status: "error", message: "server issue" });
    }
};
exports.getAnalyticsById = getAnalyticsById;
//# sourceMappingURL=user.js.map