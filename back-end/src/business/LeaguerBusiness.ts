import LeaguerDatabase from "../data/LeaguerDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/generateId";
import { LeaguerInputDTO } from "../types/DTO/LeaguerInputDTO";
import { CustomError } from "../error/CustomError";
import Leaguer from "../model/Leaguer";
import UserDatabase from "../data/UserDatabase";
import { EditFaseInputDTO } from "../types/DTO/EditFaseInputDTO";
import { EditLeaguerInputDTO } from "../types/DTO/EditLeaguerInputDTO";
import { LeaguerResponse } from "../types/leaguerResponse";

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
        throw new CustomError(422, "Token inválido ou não passado.");
      }

      if (tokenData.role !== "admin" && tokenData.role !== "mentor") {
        throw new CustomError(403, "Usuário não autorizado.");
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

      const userId = tokenData.id;

      if (tokenData.role !== "admin" && tokenData.role !== "mentor") {
        try {
          const leaguers = await this.leaguerDatabase.findByUserId(userId);

          return leaguers;
        } catch (error: any) {
          throw new CustomError(error.statusCode, error.message);
        }
      }

      const allLeaguers: LeaguerResponse =
        await this.leaguerDatabase.getAllLeaguers();

      const responsaveisNomes = [];

      for (let leaguer of allLeaguers) {
        const responsavel = await this.userDatabase.getUserById(
          leaguer.leaguer_responsavel
        );
        leaguer = {
          ...leaguer,
          leaguer_responsavel: responsavel.user_name,
        };

        responsaveisNomes.push(leaguer);
      }

      return responsaveisNomes;
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

  editLeaguerFase = async (token: string, input: EditFaseInputDTO) => {
    try {
      const { leaguerId, newFase } = input;

      if (!leaguerId || !newFase) {
        throw new CustomError(
          422,
          "Favor informar id do leaguer e fase atualizada."
        );
      }

      const tokenData = this.authenticator.getTokenData(token);

      if (!tokenData) {
        throw new CustomError(422, "Token inválido ou não passado.");
      }

      if (tokenData.role !== "admin" && tokenData.role !== "mentor") {
        throw new CustomError(403, "Usuário não autorizado.");
      }

      const newLeaguer = await this.leaguerDatabase.editLeaguerFase(input);

      return newLeaguer;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };

  editLeaguer = async (
    input: EditLeaguerInputDTO,
    token: string
  ): Promise<Leaguer | undefined> => {
    try {
      const { id, name, turma, fase, responsavel } = input;

      if (!name || !turma || !fase || !responsavel) {
        throw new CustomError(422, "Favor preencher todos os campos.");
      }

      const tokenData = this.authenticator.getTokenData(token);

      if (!tokenData) {
        throw new CustomError(422, "Token inválido ou não passado.");
      }

      if (tokenData.role !== "admin" && tokenData.role !== "mentor") {
        throw new CustomError(403, "Usuário não autorizado.");
      }

      const user = await this.userDatabase.getUserByName(responsavel);

      const alteredLeaguer: EditLeaguerInputDTO = {
        id,
        name,
        turma: Leaguer.stringToTurmaRole(turma),
        fase: Leaguer.stringToFaseRole(fase),
        responsavel: user.user_id,
      };

      const result = await this.leaguerDatabase.editLeaguer(alteredLeaguer);

      return result;
    } catch (error: any) {
      throw new CustomError(error.statusCode, error.message);
    }
  };
}
