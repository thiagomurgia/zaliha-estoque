import express from 'express'
import multer from 'multer'
import uploadConfig from '../config/multer'

import { ActivateUserController } from '../controllers/CommomUsersControllers/ActivateUserController'
import { AuthUserController } from '../controllers/CommomUsersControllers/AuthenticateUserController'
import { CreateUserController } from '../controllers/CommomUsersControllers/CreateUserController'
import { ForgotPasswordController } from '../controllers/CommomUsersControllers/ForgotPasswordController'
import { AuthenticateWithoutPasswordController } from '../controllers/CommomUsersControllers/AuthenticateWithoutPasswordController'
import { DetailUserController } from '../controllers/CommomUsersControllers/DatailUserController'
import { isAuthenticated } from '../middlewares/isAuthenticated'
import { UpdataProfileUserController } from '../controllers/CommomUsersControllers/UpdateUserProfileController'
import { GetAllSystemUsersController } from '../controllers/AdminUsersControllers/GetAllUsersController'
import { AdminUpdateUserSystyemController } from '../controllers/AdminUsersControllers/AdminUpdateUserSystemController'



const router = express.Router()

const upload = multer(uploadConfig.upload("./tmp"))


//commom user routes
router.post('/signup', new CreateUserController().handle)
router.post('/auth', new AuthUserController().handle)
router.get('/activate/:token_id', new ActivateUserController().handle)
router.post('/forgotpassword', new ForgotPasswordController().handle)
router.post('/authtoken', new AuthenticateWithoutPasswordController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)
router.put('/me', isAuthenticated, upload.single('file'), new UpdataProfileUserController().handle)

//admin user routes
router.get('/dashboard', isAuthenticated, new DetailUserController().handle)
router.get('/users', isAuthenticated, new GetAllSystemUsersController().handle)
router.put('/user/:systemUser_id', isAuthenticated, new AdminUpdateUserSystyemController().handle)

export {router}