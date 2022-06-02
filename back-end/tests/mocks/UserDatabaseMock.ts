import { userMock1, userMock2, userMock3 } from "./userMock";
import User from "../../src/model/User";
import { EditRoleInputDTO } from "../../src/types/DTO/EditRoleInputDTO";
import { EditPasswordInputDTO } from "../../src/types/DTO/EditPasswordInputDTO";

export default class UserDatabaseMock {
  insert = async (user: User): Promise<void> => {};

  getAllUsers = async (): Promise<User[]> => {
    const result = [userMock1, userMock2, userMock3]
    return result;
  }

  getUserByEmail = async (email: string): Promise<User | undefined> => {
    if (email === 'user01@teste.com') {
        return userMock1
    } else if (email === 'user02@teste.com') {
        return userMock2
    } else if (email === 'user03@teste.com') {
        return userMock3
    }
    return undefined
  };

  getUserById = async (id: string): Promise<User | undefined> => {
    if (id === 'id_mockado1') {
        return userMock1
    } else if (id === 'id_mockado2') {
        return userMock2
    } else if (id === 'id_mockado3'){
        return userMock3
    }
    return undefined
  };

  getUserByName = async (name: string): Promise<User | undefined> => {
    if (name === 'User 01') {
        return userMock1
    } else if (name === 'User 02') {
        return userMock2
    } else if (name === 'User 03') {
        return userMock3
    }
    return undefined
  };

  editUserRole = async (input: EditRoleInputDTO): Promise<void> => {};

  editPassword = async (input: EditPasswordInputDTO): Promise<void> => {};
  
}
