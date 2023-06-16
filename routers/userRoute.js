import express from 'express'
import { createUser,getUsers,updateUser,deleteUser } from '../controllers/usercontroller.js'

const UseRouter = express.Router() 

UseRouter.route('/').post(createUser).get(getUsers).put(updateUser).delete(deleteUser)

export default UseRouter