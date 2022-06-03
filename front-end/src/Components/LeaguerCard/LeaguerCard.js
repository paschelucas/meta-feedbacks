import React, { useContext } from "react";
import GlobalContext from "../../Global/GlobalContext";
import { CardInfo } from "./styled";

const LeaguerCard = (props) => {
    const {getLeaguerProfile} = useContext(GlobalContext);

    return (
        <CardInfo onClick={() => getLeaguerProfile(props.leaguer)}>
           <h4>{props.name}</h4>
           <p>{props.turma}</p>
           <p>{props.fase}</p>
           <p>{props.responsavel}</p>
         </CardInfo>
    );
};
export default LeaguerCard;