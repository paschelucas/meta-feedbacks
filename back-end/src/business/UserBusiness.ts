import UserDatabase from "../data/UserDatabase";
import User from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/generateId";
import { LoginInputDTO } from "../types/DTO/LoginInputDTO";
import { UserInputDTO } from "../types/DTO/UserInputDTO";
import { CustomError } from "../error/CustomError";

export default class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private hashManager: HashManager
  ) {}

  signUp = async (input: UserInputDTO): Promise<string> => {
    try {
      const { name, email, password, role } = input;
      const newRole = User.stringToUserRole(role);

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

      const registeredUser = await this.userDatabase.findByEmail(email);
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
      return token;
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

      const registeredUser = await this.userDatabase.findByEmail(email);
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

      const token = this.authenticator.generate({
        id: registeredUser.id,
        role: registeredUser.role,
      });
      return token;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
