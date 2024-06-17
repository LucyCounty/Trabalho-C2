import { Request, Response } from "express";
import UserDataBaseService from "../services/UserDataBaseService";
import { generateHash } from "../utils/BcryptUtils";

class UserController {
  constructor() {}

  async listUsers(req: Request, res: Response) {
    try {
      const users = await UserDataBaseService.listDBUsers();
      res.json({
        status: "ok",
        users: users,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async createUser(req: Request, res: Response) {
    const body = req.body;
    console.log(body);

    if (!body.email || !body.name || !body.password) {
      res.json({
        status: "error",
        message: "Falta parâmetros.",
      });
      return;
    }

    const hashPassword = await generateHash(body.password);

    if(!hashPassword){
      res.json({
        status: "error",
        message: "Erro ao criptografar senha...",
      });
    }

    try {
      const newuser = await UserDataBaseService.insertDBUser({
        name: body.name,
        email: body.email,
        password: hashPassword as string
      });
      res.json({
        status: "ok",
        newuser: newuser,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: "error",
        message: "Faltou o ID.",
      });
    }

    const { name, email } = req.body;
    if (!email || !name) {
      res.json({
        status: "error",
        message: "Falta parâmetros.",
      });
    }

    try {
      const updatedUser = await UserDataBaseService.updateDBUser(
        {
          name: name,
          email: email,
        },
        parseInt(id)
      );
      res.json({
        status: "ok",
        newuser: updatedUser,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: "error",
        message: "Faltou o ID.",
      });
    }

    try {
      const response = await UserDataBaseService.deleteDBUser(parseInt(id));
      if (response) {
        res.json({
          status: "ok",
          message: "Usuário deletado com sucesso!",
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

export default new UserController();
