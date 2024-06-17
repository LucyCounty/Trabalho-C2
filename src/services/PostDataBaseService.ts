import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PostDataBaseService {
  constructor() {}

  async listDBPosts() {
    try {
      return await prisma.post.findMany({
        include: {
          author: true,
          comment: {
            include: {
              author: true
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async insertDBPost(post: Prisma.PostCreateInput) {
    try {
      const newPost = await prisma.post.create({
        data: post,
      });
      return newPost;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateDBPost(post: Prisma.PostUpdateInput, id: number) {
    try {
      const updatedPost = await prisma.post.update({
        data: post,
        where: {
          id: id,
        },
      });
      return updatedPost;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteDBPost(id: number) {
    try {
      await prisma.post.delete({
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

export default new PostDataBaseService();
