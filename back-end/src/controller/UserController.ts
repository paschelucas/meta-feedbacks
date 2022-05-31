import { Request, Response } from "express";
import UserBusiness from "../business/UserBusiness";
import { UserInputDTO } from "../types/DTO/UserInputDTO";
import { LoginInputDTO } from "../types/DTO/LoginInputDTO";
import { EditRoleInputDTO } from "../types/DTO/EditRoleInputDTO";
import { EditPasswordInputDTO } from "../types/DTO/EditPasswordInputDTO";
import { MailTransporter } from "../services/MailTransporter";

export default class UserController {
  constructor(
    private userBusiness: UserBusiness,
    private mailTransporter: MailTransporter
  ) {}

  public signUp = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    const token = req.headers.authorization as string;

    const input: UserInputDTO = {
      name,
      email,
      password,
      role,
    };
    try {
      const auth = await this.userBusiness.signUp(input, token);
       await this.mailTransporter.transporter.sendMail({
        from: `${process.env.NODEMAILER_USER}`,
        to: email,
        subject: "Cadastro realizado.",
        text: "",
        html: `
        <div>
        <h3>Você foi cadastrade no sistema Meta League Feedbacks. Aqui estão seus dados:</h3> 
        <ul>
        <li>
        <p>Email: ${email}</p>
        </li>
        <li>
        <p>Senha: ${password}</p>
        </li>
        </ul>
        </div>`,
      });
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

  public getAllUsers = async (req: Request, res: Response) => {
    const token = req.headers.authorization as string;

    try {
      const users = await this.userBusiness.getAllUsers(token);
      res.status(200).send(users);
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  public editUserRole = async (req: Request, res: Response) => {
    const { userName, newRole } = req.body;
    const token = req.headers.authorization as string;
    const input: EditRoleInputDTO = {
      userName,
      newRole,
    };

    try {
      const userPermission = await this.userBusiness.editUserRole(input, token);
      res
        .status(201)
        .send({ message: "Permissão atualizada com sucesso", userPermission });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  public editPassword = async (req: Request, res: Response) => {
    const { email, password, new_password } = req.body;
    const input: EditPasswordInputDTO = {
      email,
      password,
      new_password,
    };

    try {
      const userPermission = await this.userBusiness.editPassword(input);
      res
        .status(201)
        .send({ message: "Senha atualizada com sucesso", userPermission });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
}
