import LeaguerDatabase from "../data/LeaguerDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/generateId";
import { LeaguerInputDTO } from "../types/DTO/LeaguerInputDTO";
import { CustomError } from "../error/CustomError";
import Leaguer from "../model/Leaguer";
import UserDatabase from "../data/UserDatabase";

export default class LeaguerBusiness {
  constructor(
    private leaguerDatabase: LeaguerDatabase,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator,
    private userDatabase: UserDatabase
  ) {}

  createLeaguer = async (
    input: LeaguerInputDTO,
    token: string
  ): Promise<Leaguer> => {
    try {
      const { name, turma, fase, responsavel } = input;

      if (!name || !turma || !fase || !responsavel) {
        throw new CustomError(422, "Favor preencher todos os campos.");
      }

      const tokenData = this.authenticator.getTokenData(token);

      if (!tokenData) {
        throw new Error("Token inválido ou não passado.");
      }

      if (tokenData.role !== "admin" && tokenData.role !== "mentor") {
        throw new Error("Usuário não autorizado.");
      }

      const user = await this.userDatabase.getUserByName(responsavel);

      const id = this.idGenerator.generateId();

      const newLeaguer = new Leaguer(
        id,
        name,
        Leaguer.stringToTurmaRole(turma),
        Leaguer.stringToFaseRole(fase),
        user.user_id
      );

      await this.leaguerDatabase.insert(newLeaguer);

      return newLeaguer;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  getAllLeaguers = async (token: string) => {
    try {
      const tokenData = this.authenticator.getTokenData(token);

      if (!tokenData) {
        throw new Error("Token inválido ou não enviado.");
      }

      if (tokenData.role !== "admin" && tokenData.role !== "mentor") {
        try {
          const userId = tokenData.id;

          const leaguers = await this.leaguerDatabase.findByUserId(userId);

          return leaguers;
        } catch (error: any) {
          throw new CustomError(error.statusCode, error.message);
        }
      }

      const allLeaguers = await this.leaguerDatabase.getAllLeaguers();

      return allLeaguers;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  getLeaguerByUserId = async (token: string) => {
    try {
      const tokenData = this.authenticator.getTokenData(token);

      if (!tokenData) {
        throw new Error("Token inválido ou não enviado.");
      }

      const userId = tokenData.id;

      const leaguers = await this.leaguerDatabase.findByUserId(userId);

      return leaguers;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
