import LeaguerDatabase from "../data/LeaguerDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/generateId";
import { LeaguerInputDTO } from "../types/DTO/LeaguerInputDTO";
import { CustomError } from "../error/CustomError";
import Leaguer from "../model/Leaguer";


export default class LeaguerBusiness {

    constructor(
        private leaguerDatabase: LeaguerDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ){}

    createLeaguer = async (input: LeaguerInputDTO, token: string): Promise<Leaguer> => {
        try {

        const { name, turma, fase } = input;

          if (!name || !turma || !fase) {
              throw new CustomError(422, "Favor preencher todos os campos.");
            }
            
        const tokenData = this.authenticator.getTokenData(token)
  
            if(!tokenData){
               throw new Error("Token inválido ou não passado")
            }
  
            if(tokenData.role!=="admin" && tokenData.role!=="mentor"){
               throw new Error("usuário não autorizado")
            }

        const userId = tokenData.id
    
        const id = this.idGenerator.generateId()
    
        const newLeaguer = new Leaguer(
          id,
          name,
          Leaguer.stringToTurmaRole(turma),
          Leaguer.stringToFaseRole(fase),
          userId
        );
          
        await this.leaguerDatabase.insert(newLeaguer);

        return newLeaguer;
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
          }
    }

    getAllLeaguers = async (token:string) => {
        
        try {
            const tokenData = this.authenticator.getTokenData(token)
  
            if(!tokenData){
               throw new Error("Token inválido ou não passado")
            }
  
            if(tokenData.role!=="admin" && tokenData.role!=="mentor"){
               throw new Error("usuário não autorizado")
            }

            const allLeaguers = await this.leaguerDatabase.getAllLeaguers();

            return allLeaguers;
            
        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message);
        }
    }
}