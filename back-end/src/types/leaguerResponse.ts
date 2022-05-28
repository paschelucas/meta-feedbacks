import { TurmaRole, FaseRole } from "../model/Leaguer"

export type LeaguerResponse = {
    leaguer_id: string
    leaguer_name: string
    leaguer_turma: TurmaRole
    leaguer_fase: FaseRole
    leaguer_responsavel: string
}[]