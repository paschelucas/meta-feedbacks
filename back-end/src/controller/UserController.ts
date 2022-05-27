import { Request, Response } from "express";
import UserBusiness from "../business/UserBusiness";
import { UserInputDTO } from "../types/DTO/UserInputDTO";
import { LoginInputDTO } from "../types/DTO/LoginInputDTO";
import { EditRoleInputDTO } from "../types/DTO/EditRoleInputDTO";

export default class UserController {
  constructor(private userBusiness: UserBusiness) {}

  public signUp = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    const token = req.headers.authorization as string

    const input: UserInputDTO = {
      name,
      email,
      password,
      role,
    };
    try {
      const auth = await this.userBusiness.signUp(input, token);
      res
        .status(201)
        .send({ message: "Usuário cadastrado com sucesso.", auth: auth });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const input: LoginInputDTO = {
      email,
      password,
    };

    try {
      const auth = await this.userBusiness.login(input);
      res
        .status(200)
        .send({ message: "Login efetuado com sucesso.", auth: auth });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  public getAllUsers = async (req:Request, res:Response) => {
    const token = req.headers.authorization as string

    try {
      const users = await this.userBusiness.getAllUsers(token)
      res
      .status(200)
      .send(users)

    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
      
    }
  }

  public editUserRole = async (req: Request, res: Response) => {
    const {userName, newRole} = req.body
    const token = req.headers.authorization as string
    const input: EditRoleInputDTO = {
      userName,
      newRole
    }
    
    try {
      const userPermission = await this.userBusiness.editUserRole(input, token);
      res
      .status(201)
      .send({message: "Permissão atualizada com sucesso", userPermission})

    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
      
    }
  };
}
