import express from 'express'
import { createPost,getPosts,updatePost,deletePost } from '../controllers/postcontrollers.js'

const PostRouter = express.Router() 


PostRouter.route('/post').post(createPost).get(getPosts).put(updatePost).delete(deletePost)

export default PostRouter