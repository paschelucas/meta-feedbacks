import React, { useContext } from "react";
import GlobalContext from "../../Global/GlobalContext";
import { CardInfo, ConteinerCard,Main} from "./styled";
import {FaUsers} from 'react-icons/fa'
const LeaguerCard = (props) => {
    const { getLeaguerProfile } = useContext(GlobalContext);

    return (
        <ConteinerCard>
            <Main>
                <CardInfo onClick={() => getLeaguerProfile(props.leaguer)}>
                
                    <h4>{props.name}</h4>
                    <p><FaUsers/>{props.turma}</p>
                    <p>{props.fase}</p>
                    <p>{props.responsavel}</p>
                </CardInfo>
            </Main>
        </ConteinerCard>
    );
};
export default LeaguerCard;