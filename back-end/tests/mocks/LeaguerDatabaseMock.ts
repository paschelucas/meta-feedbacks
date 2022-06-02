import Leaguer from "../../src/model/Leaguer";
import { EditFaseInputDTO } from "../../src/types/DTO/EditFaseInputDTO";
import { EditLeaguerInputDTO } from "../../src/types/DTO/EditLeaguerInputDTO";
import { leaguerMock1, leaguerMock2, leaguerMock3 } from "./leaguerMock";

export default class LeaguerDatabaseMock {
  public insert = async (leaguer: Leaguer): Promise<void> => {};

  public getAllLeaguers = async (): Promise <Leaguer[]> => {
    const result = [leaguerMock1,leaguerMock2,leaguerMock3]
    return result
  };

  public findByUserId = async (responsavel: string): Promise <Leaguer | undefined> => {
    if (responsavel === 'User 01') {
        return leaguerMock1
    } else if (responsavel === 'User 02') {
        return leaguerMock2
    } else if (responsavel === 'User 03'){
        return leaguerMock3
    }
    return undefined
  };

  public findLeaguerById = async (id: string): Promise<Leaguer | undefined> => {
    if (id === 'id_mockado1') {
        return leaguerMock1
    } else if (id === 'id_mockado2') {
        return leaguerMock2
    } else if (id === 'id_mockado3'){
        return leaguerMock3
    }
    return undefined
  };

  editLeaguerFase = async (input: EditFaseInputDTO): Promise <void> => {};

  editLeaguer = async (input: EditLeaguerInputDTO): Promise <void> => {};
}
