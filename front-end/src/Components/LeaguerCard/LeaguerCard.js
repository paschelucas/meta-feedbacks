import React from "react";
import { CardInfo } from "./styled";

const LeaguerCard = (props) => {
    return (
        <CardInfo>
           <h4>{props.name}</h4>
           <p>{props.turma}</p>
           <p>{props.fase}</p>
           <p>{props.responsavel}</p>
         </CardInfo>
    );
};
export default LeaguerCard;