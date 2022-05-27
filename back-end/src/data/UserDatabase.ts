import { BaseDatabase } from "./BaseDatabase";
import User from "../model/User";
import { FindUserResponse } from "../types/findUserResponse";
import { EditRoleInputDTO } from "../types/DTO/EditRoleInputDTO";

export default class UserDatabase extends BaseDatabase {
  protected TABLE_NAME = "users";

  insert = async (user: User): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME).insert(user);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  findByEmail = async (email: string) => {
    try {
      const [queryResult] = await this.connection(this.TABLE_NAME)
        .select("*")
        .where({ user_email: email });
      return queryResult;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  findById = async (id: string): Promise<User | undefined> => {
    try {
      const [queryResult] = await this.connection(this.TABLE_NAME)
        .select("*")
        .where("user_id", id);
      return queryResult;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  getUserByName = async (name: string) => {
    try {
      const queryResult: FindUserResponse = await this.connection(
        this.TABLE_NAME
      )
        .select("*")
        .where({ user_name: name });
      return queryResult[0];
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  editUserRole = async (input: EditRoleInputDTO) => {
    try {
      const result = await this.connection(this.TABLE_NAME)
      .update({user_role: input.newRole})
      .where({user_name: input.userName})

      const alteredUser: FindUserResponse = await this.connection(this.TABLE_NAME)
      .select("*")
      .where({user_name: input.userName})

      return alteredUser[0]

    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
  
}
