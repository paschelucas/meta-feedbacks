import { BaseDatabase } from "./BaseDatabase";
import Leaguer from "../model/Leaguer";
import { FindByEmailResponse } from "../types/findByEmailResponse";

export default class LeaguerDatabase extends BaseDatabase {
  protected TABLE_NAME = "leaguers";

  insert = async (leaguer: Leaguer): Promise<void> => {
    try {
      await this
      .connection(this.TABLE_NAME)
      .insert(leaguer);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  getAllLeaguers = async () => {
    try {
      const queryResult: FindByEmailResponse = await this.connection(
        this.TABLE_NAME
      )
        .select("*")
      return queryResult
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);      
    }
  }

  findById = async (id: string) => {
    try {
      const queryResult: FindByEmailResponse = await this.connection(
        this.TABLE_NAME
      )
        .select("*")
        .where({ leaguer_id: id });
      return queryResult[0];
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
}