
import { Router } from 'express'
import { newEntry,  getRegistry} from '../controllers/entry.controller.js'
import { authRoutesValidation } from '../middlewares/auth.middleware.js'
import {entrySchemaValidation } from '../middlewares/entry.middleware.js'

const router = Router()

router.use(authRoutesValidation)
router.post("/registry", entrySchemaValidation, newEntry)
router.get("/registry", getRegistry)

export default router