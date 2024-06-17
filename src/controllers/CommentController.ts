import { Request, Response } from "express";
import CommentDataBaseService from "../services/CommentDataBaseService";

class CommentController {
  constructor() {}

  async listComments(req: Request, res: Response) {
    try {
      const comments = await CommentDataBaseService.listDBComments();
      res.json({
        status: "ok",
        comments: comments,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async createComment(req: Request, res: Response) {
    const body = req.body;
    console.log(body);

    if (!body.authorId || !body.content || !body.postId) {
      res.json({
        status: "error",
        message: "Falta parâmetros.",
      });
      return;
    }

    try {
      const newComment = await CommentDataBaseService.insertDBComment({
        content: body.content,
        post: {
          connect: { id: parseInt(body.postId) }
        },
        author: {
          connect: { id: parseInt(body.authorId) }
        }
      });
      res.json({
        status: "ok",
        newComment: newComment,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async updateComment(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: "error",
        message: "Faltou o ID.",
      });
    }

    const { content, postId, authorId } = req.body;
    if (!authorId || !content || !postId) {
      res.json({
        status: "error",
        message: "Falta parâmetros.",
      });
    }

    try {
      const updatedComment = await CommentDataBaseService.updateDBComment(
        {
          content: content,
          post: {
            connect: { id: parseInt(postId) }
          },
          author: {
            connect: { id: parseInt(authorId) }
          }
        },
        parseInt(id)
      );
      res.json({
        status: "ok",
        newComment: updatedComment,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async deleteComment(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: "error",
        message: "Faltou o ID.",
      });
    }

    try {
      const response = await CommentDataBaseService.deleteDBComment(parseInt(id));
      if (response) {
        res.json({
          status: "ok",
          message: "Comentário deletado com sucesso!",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: error,
      });
    }
  }
}

export default new CommentController();
