import { BaseDatabase } from "./BaseDatabase";
import Leaguer from "../model/Leaguer";
import { FindUserResponse } from "../types/findUserResponse";

export default class LeaguerDatabase extends BaseDatabase {
  protected TABLE_NAME = "leaguers";

  public insert = async (leaguer: Leaguer): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME).insert(leaguer);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public getAllLeaguers = async () => {
    try {
      const queryResult: FindUserResponse = await this.connection(
        this.TABLE_NAME
      ).select("*");
      return queryResult;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  public findByUserId = async (id: string) => {
    try {
      const queryResult: FindUserResponse = await this.connection(
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
}
