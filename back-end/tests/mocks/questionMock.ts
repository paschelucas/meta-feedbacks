import { QuestionDTO } from "../../src/types/DTO/QuestionDTO";
import { UpdateQuestionInputDTO } from "../../src/types/DTO/UpdateQuestionInputDTO";

//Admin
export const questionMock: QuestionDTO = {
    id: "id_mockado",
    text: "texto_mockado",
    token: "token_mockado"
}

//Gestor
export const questionMock2: QuestionDTO = {
    id: "id_mockado2",
    text: "texto_mockado2",
    token: "token_mockado2"
}

//Mentor
export const questionMock3: QuestionDTO = {
    id: "id_mockado3",
    text: "texto_mockado3",
    token: "token_mockado3"
}



export const updateQuestionMock: UpdateQuestionInputDTO = {
    id: "id_mockado",
    newText: "texto_mockado",
    token: "token_mockado"
}