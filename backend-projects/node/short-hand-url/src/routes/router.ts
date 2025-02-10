import { Router } from 'express'

import { basicGet } from '../controllers/users/get-url'
import { postUrl } from '../controllers/users/post-url'

const useRouter = Router()

useRouter.route('/').get(basicGet).post(postUrl)

export { useRouter }
