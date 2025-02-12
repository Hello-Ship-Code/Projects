import { Router } from "express";

import { getAllUrl } from "../controllers/urls/get-url";
import { postUrl } from "../controllers/urls/post-url";
import { getUrlById } from "../controllers/urls/analytics-url";

const useRouter = Router();

useRouter.route("/").post(postUrl).get(getAllUrl)

useRouter.route('/:shortId').get(getUrlById)

export { useRouter };
