import GlobalContext from "./GlobalContext";
import useRequest from '../hooks/useRequest.js';
import tokenMock from "../mocks/tokenMock";
import { goToHome, goToLogin } from "../routes/coordinator";
import { useNavigate } from "react-router-dom";

const GlobalState = (props) => {

    const {makeRequest, isLoading} = useRequest();
    const navigate = useNavigate();

    // simulação do comportamento do login
    const login = (data) => {
            const token = tokenMock;  

            console.log(data);

            if (token) {
                localStorage.setItem("token", token);
            }
            else {
                alert('Deu ruim');
            }

            goToHome(navigate)
    };
    
    const signup = (data) => {
        const token = tokenMock;

        if(token) {
            localStorage.setItem("token",token);
        }
        else {
            alert("😭");
        }
        goToLogin(navigate)
    };

    const value = {login, isLoading, signup};

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
};
export default GlobalState;