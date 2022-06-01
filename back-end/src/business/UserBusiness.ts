import UserDatabase from "../data/UserDatabase";
import User from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/generateId";
import { LoginInputDTO } from "../types/DTO/LoginInputDTO";
import { UserInputDTO } from "../types/DTO/UserInputDTO";
import { CustomError } from "../error/CustomError";
import { EditRoleInputDTO } from "../types/DTO/EditRoleInputDTO";
import { EditPasswordInputDTO } from "../types/DTO/EditPasswordInputDTO";

export default class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private hashManager: HashManager
  ) {}

  signUp = async (input: UserInputDTO, adminToken: string): Promise<any> => {
    try {
      const { name, email, password, role } = input;
      
      if (role !== "admin" && role !== "mentor" && role !== "gestor") {
        throw new CustomError(422, "Tipo de usuário inválido.");
      }
      
      const newRole = User.stringToUserRole(role);
      const tokenData = this.authenticator.getTokenData(adminToken);

      if (!tokenData) {
        throw new CustomError(422, "Token inválido ou não passado.");
      }

      if (tokenData.role !== "admin") {
        throw new CustomError(403, "Usuário não autorizado.");
      }

      if (!name || !email || !password || !newRole) {
        throw new CustomError(422, "Favor preencher todos os campos.");
      }

      const validEmailVerifier: RegExp =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

      const isEmailValid = validEmailVerifier.test(email);

      if (!isEmailValid) {
        throw new CustomError(422, "Formato de email inválido.");
      }

      const validPasswordVerifier: RegExp =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{9,}$/;
      const isPasswordValid = validPasswordVerifier.test(password);

      if (!isPasswordValid) {
        throw new CustomError(
          422,
          "Senhas devem ter pelo menos 9 caracteres, conter um dígito, uma letra minúscula e uma maiúscula."
        );
      }

      const registeredUser = await this.userDatabase.getUserByEmail(email);
      if (registeredUser) {
        throw new CustomError(422, "Email já cadastrado.");
      }

      const id = this.idGenerator.generateId();
      const hashPassword = await this.hashManager.hash(password);

      const newUser = new User(
        id,
        name,
        email,
        hashPassword,
        User.stringToUserRole(role)
      );
      await this.userDatabase.insert(newUser);

      const token = this.authenticator.generate({ id, role });

      const auth = { token, name, role };

      return auth;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  login = async (input: LoginInputDTO) => {
    try {
      const { email, password } = input;

      if (!email || !password) {
        throw new CustomError(422, "Favor informar email e senha.");
      }

      const registeredUser = await this.userDatabase.getUserByEmail(email);
      if (!registeredUser) {
        throw new CustomError(404, "Este usuário não está cadastrado.");
      }
      const passwordIsCorrect = await this.hashManager.compare(
        password,
        registeredUser.user_password
      );

      if (!passwordIsCorrect) {
        throw new CustomError(403, "Email ou senha incorretos.");
      }

      const role = registeredUser.user_role;

      const name = registeredUser.user_name;

      const token = this.authenticator.generate({
        id: registeredUser.user_id,
        role,
      });

      const auth = { token, name, role };

      return auth;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  getAllUsers = async (token: string) => {
    try {
      const tokenData = this.authenticator.getTokenData(token);

      if (!tokenData) {
        throw new CustomError(422, "Token inválido ou não passado.");
      }

      if (tokenData.role !== "admin") {
        throw new CustomError(403, "Usuário não autorizado.");
      }

      const users = await this.userDatabase.getAllUsers();

      return users;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  editUserRole = async (input: EditRoleInputDTO, token: string) => {
    try {
      const { userName, newRole } = input;
      if (!userName || !newRole) {
        throw new CustomError(422, "Favor preencher todos os campos.");
      }

      const tokenData = this.authenticator.getTokenData(token);

      if (!tokenData) {
        throw new CustomError(422, "Token inválido ou não passado.");
      }

      if (tokenData.role !== "admin") {
        throw new CustomError(403, "Usuário não autorizado.");
      }

      const registeredUser = await this.userDatabase.getUserByName(userName);
      if (!registeredUser) {
        throw new CustomError(422, "Usuário não cadastrado.");
      }

      const newAuthorization = await this.userDatabase.editUserRole(input);

      return newAuthorization;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  editPassword = async (input: EditPasswordInputDTO) => {
    try {
      const { email, password, new_password } = input;

      if (!email || !password) {
        throw new CustomError(422, "Favor informar email e senha provisória.");
      }

    const validPasswordVerifier: RegExp =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{9,}$/;
    const isPasswordValid = validPasswordVerifier.test(new_password);

    if (!isPasswordValid) {
      throw new CustomError(
        422,
        "Senhas devem ter pelo menos 9 caracteres, conter um dígito, uma letra minúscula e uma maiúscula."
      );
    }

      const registeredUser = await this.userDatabase.getUserByEmail(email);
      if (!registeredUser) {
        throw new CustomError(404, "Este usuário não está cadastrado.");
      }
      const passwordIsCorrect = await this.hashManager.compare(
        password,
        registeredUser.user_password
      );

      if (!passwordIsCorrect) {
        throw new CustomError(403, "Email ou senha provisória incorretos.");
      }

      const role = registeredUser.user_role
      
      const name = registeredUser.user_name

      const hashPassword = await this.hashManager.hash(new_password);

      const hashInput: EditPasswordInputDTO = {
        email,
        password,
        new_password: hashPassword
      }
      
      await this.userDatabase.editPassword(hashInput);

      const token = this.authenticator.generate({
        id: registeredUser.user_id,
        role
      });

      const auth = {token, name, role}

      return auth;

    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
