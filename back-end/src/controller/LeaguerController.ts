import { Request, Response } from "express";
import LeaguerBusiness from "../business/LeaguerBusiness";
import { EditFaseInputDTO } from "../types/DTO/EditFaseInputDTO";
import { LeaguerInputDTO } from "../types/DTO/LeaguerInputDTO";
import { EditLeaguerInputDTO } from "../types/DTO/EditLeaguerInputDTO";

export default class LeaguerController {
  constructor(private leaguerBusiness: LeaguerBusiness) {}

  public createLeaguer = async (req: Request, res: Response) => {
    const { name, turma, fase, responsavel } = req.body;
    const token = req.headers.authorization as string;

    const input: LeaguerInputDTO = {
      name,
      turma,
      fase,
      responsavel
    };

    try {
      const leaguer = await this.leaguerBusiness.createLeaguer(input, token);
      res
        .status(201)
        .send({ message: "Leaguer cadastrado com sucesso.", leaguer: leaguer });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  public getAllLeaguers = async (req:Request, res: Response) => {
    const token = req.headers.authorization as string

    try {
      const allLeaguers = await this.leaguerBusiness.getAllLeaguers(token)
      res
      .status(200)
      .send({leaguers: allLeaguers})

    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  public getLeaguersByUserId = async (req:Request, res: Response) => {
    const token = req.headers.authorization as string

    try {
      const leaguers = await this.leaguerBusiness.getLeaguerByUserId(token);
      res
      .status(200)
      .send({leaguers: leaguers})

    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  public editLeaguerFase = async (req: Request, res: Response) => {
    const {leaguerId, newFase} = req.body
    const token = req.headers.authorization as string;

    const input: EditFaseInputDTO = {
      leaguerId,
      newFase
    }

    try {
      const leaguer = await this.leaguerBusiness.editLeaguerFase(token,input);
      res
        .status(201)
        .send({ message: "Fase do leaguer alterada com sucesso.", leaguer: leaguer });

    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };

  public editLeaguer = async (req: Request, res: Response) => {
    const { id, name, turma, fase, responsavel } = req.body;
    const token = req.headers.authorization as string;

    const input: EditLeaguerInputDTO = {
      id,
      name,
      turma,
      fase,
      responsavel
    };

    try {
      const leaguer = await this.leaguerBusiness.editLeaguer(input, token);
      res
        .status(201)
        .send({ message: "Leaguer atualizado com sucesso.", leaguer: leaguer });
    } catch (error: any) {
      const { statusCode, message } = error;
      res.status(statusCode || 400).send({ message });
    }
  };
}