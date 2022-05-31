import { BaseDatabase } from "./BaseDatabase";
import Leaguer from "../model/Leaguer";
import { EditFaseInputDTO } from "../types/DTO/EditFaseInputDTO";
import { LeaguerResponse } from "../types/leaguerResponse";
import { EditLeaguerInputDTO } from "../types/DTO/EditLeaguerInputDTO";

export default class LeaguerDatabase extends BaseDatabase {
  protected TABLE_NAME = "leaguers";

  public insert = async (leaguer: Leaguer): Promise<void> => {
    try {
      console.log(leaguer)
      await this.connection(this.TABLE_NAME).insert(leaguer);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getAllLeaguers = async (): Promise <LeaguerResponse> => {
    try {
      const queryResult: LeaguerResponse = await this.connection(
        this.TABLE_NAME
      ).select("*");
      return queryResult;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public findByUserId = async (id: string): Promise <LeaguerResponse | undefined> => {
    try {
      const queryResult: LeaguerResponse = await this.connection(
        this.TABLE_NAME
      )
        .select("*")
        .where({ leaguer_responsavel: id });
      return queryResult;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public findLeaguerById = async (id: string): Promise<Leaguer | undefined> => {
    try {
      const [leaguer] = await this.connection(this.TABLE_NAME).where(
        "leaguer_id",
        id
      );

      return leaguer;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  editLeaguerFase = async (input: EditFaseInputDTO): Promise <Leaguer | undefined> => {
    try {
      const result = await this.connection(this.TABLE_NAME)
      .update({leaguer_fase: input.newFase})
      .where({leaguer_id: input.leaguerId})

      const [alteredLeaguer] = await this.connection(this.TABLE_NAME)
      .select("*")
      .where({leaguer_id: input.leaguerId})

      return alteredLeaguer

    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  editLeaguer = async (input: EditLeaguerInputDTO): Promise <Leaguer | undefined> => {
    try {
      const result = await this.connection(this.TABLE_NAME)
      .update({leaguer_name: input.name,
      leaguer_turma: input.turma,
      leaguer_fase: input.fase,
      leaguer_responsavel: input.responsavel})
      .where({leaguer_id: input.id})

      const [alteredLeaguer] = await this.connection(this.TABLE_NAME)
      .select("*")
      .where({leaguer_id: input.id})

      return alteredLeaguer;

    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}
