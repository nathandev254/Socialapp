import express from "express";
import {
  getComments,
  updateComment,
  deleteComment,
  createComment,
} from "../controllers/commentcontroller.js";

const commentRouter = express.Router();

commentRouter
  .route('/comment')
  .get(getComments)
  .put(updateComment)
  .delete(deleteComment)
  .post(createComment);

export default commentRouter;
