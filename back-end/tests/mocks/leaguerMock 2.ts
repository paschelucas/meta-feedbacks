import Leaguer, { FaseRole, TurmaRole } from "../../src/model/Leaguer";

export const leaguerMock1 = new Leaguer(
    "id_mockado1",
    "Leaguer 01",
    TurmaRole.PILOTO,
    FaseRole.INTRO,
    "User 01"
)

export const leaguerMock2= new Leaguer(
    "id_mockado2",
    "Leaguer 02",
    TurmaRole.TURMA1,
    FaseRole.LABS,
    "User 02"
)

export const leaguerMock3= new Leaguer(
    "id_mockado3",
    "Leaguer 03",
    TurmaRole.TURMA2,
    FaseRole.BETA,
    "User 03"
)