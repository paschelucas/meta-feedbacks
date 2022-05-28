import { BaseDatabase } from "./BaseDatabase";
import User from "../model/User";
import { FindUserResponse } from "../types/findUserResponse";
import { EditRoleInputDTO } from "../types/DTO/EditRoleInputDTO";
import { EditPasswordInputDTO } from "../types/DTO/EditPasswordInputDTO";

export default class UserDatabase extends BaseDatabase {
  protected TABLE_NAME = "users";

  insert = async (user: User): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME).insert(user);
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  getAllUsers = async () => {
    try {
      const result: FindUserResponse = await this.connection(this.TABLE_NAME)
      .select("user_id", "user_name", "user_email", "user_role")
      return result;

    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  getUserByEmail = async (email: string) => {
    try {
      const [queryResult] = await this.connection(this.TABLE_NAME)
        .select("*")
        .where({ user_email: email });
      return queryResult;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };

  getUserById = async (id: string): Promise<User | undefined> => {
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

  editPassword = async (input: EditPasswordInputDTO) => {
    try {
      const result = await this.connection(this.TABLE_NAME)
      .update({user_password: input.new_password})
      .where({user_email: input.email})

    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  };
  
}
