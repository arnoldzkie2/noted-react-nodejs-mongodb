import express from 'express'
import {renderUser, registerUser , changePasword, loginUser, getAllUser} from '../controller/user.js'
const user = express.Router()

user.route('/register').post(registerUser)
user.route('/users').get(getAllUser)
user.route('/login').post(loginUser)
user.route('/:id').get(renderUser).patch(changePasword)
export { user }