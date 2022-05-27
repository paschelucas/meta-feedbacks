import GlobalContext from "./GlobalContext";
import useRequest from '../hooks/useRequest.js';
import tokenMock from "../mocks/tokenMock";
import { goToHome, goToLogin } from "../routes/coordinator";
import { useNavigate } from "react-router-dom";
import { base_URL } from '../constants/urls';
import { useState } from "react";

const GlobalState = (props) => {

    const {makeRequest, isLoading} = useRequest();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const login = async (data) => {
        const res = await makeRequest('post', `${base_URL}user/login`, data);
        
        if (res.token) localStorage.setItem('token', res.token);

        else {
            setErrorMessage(res);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        goToLogin(navigate);
    };
    
    const signup = async (data) => {
        const {token} = await makeRequest('post', `${base_URL}user/signup`, data);

        localStorage.setItem('token', token);
    };

    const leaguersSignup = async (data) => {
        const token = localStorage.getItem('token');

        const header = {
            headers: {
                Authorization: token
            }
        }

        const res = await makeRequest('post', `${base_URL}leaguers/create`, data, header);
        
        console.log(res);
    }

    const getLeaguers = async () => {
        const token = localStorage.getItem('token');

        const header = {
            headers: {
                Authorization: token
            }
        }

        const res = await makeRequest('post', `${base_URL}leaguers`, header);

        console.log(res);
    };

    const value = { isLoading, errorMessage, login, logout, signup, leaguersSignup, getLeaguers };

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
};
export default GlobalState;