import { Router } from 'express'

import { getAnalyticsById,getUrlByID, getAllData, postUrl } from '../controllers/user'

const useRouter = Router()

useRouter.route('/').post(postUrl).get(getAllData)
useRouter.route('/analytics/:shortId').get(getAnalyticsById)
useRouter.route('/:shortId').get(getUrlByID)

export { useRouter }
