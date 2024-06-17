import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CommentDataBaseService {
  constructor() {}

  async listDBComments() {
    try {
      return await prisma.comment.findMany({
        include: {
          author: true
        }
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async insertDBComment(comment: Prisma.CommentCreateInput) {
    try {
      const newComment = await prisma.comment.create({
        data: comment,
      });
      return newComment;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateDBComment(comment: Prisma.CommentUpdateInput, id: number) {
    try {
      const updatedComment = await prisma.comment.update({
        data: comment,
        where: {
          id: id,
        },
      });
      return updatedComment;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteDBComment(id: number) {
    try {
      await prisma.comment.delete({
        where: {
          id: id,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new CommentDataBaseService();
