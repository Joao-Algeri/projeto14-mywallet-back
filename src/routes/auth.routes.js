import { Router } from 'express'
import { signUp, signIn } from '../controllers/auth.controller.js'
import {  signUpSchemaValidation,signInSchemaValidation} from '../middlewares/auth.middleware.js'

const router = Router()

router.post("/sign-up", signUpSchemaValidation, signUp)
router.post("/sign-in", signInSchemaValidation, signIn)

export default router