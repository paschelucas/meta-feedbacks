import GlobalContext from "./GlobalContext";
import useRequest from '../hooks/useRequest.js';
import { goToLogin, goToMenu } from "../routes/coordinator";
import { useNavigate } from "react-router-dom";
import { base_URL } from '../constants/urls';
import { header } from '../constants/header';
import { useState } from "react";

const GlobalState = (props) => {

    // hooks
    const {makeRequest, isLoading} = useRequest();
    const navigate = useNavigate();

    // states
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [leaguers, setLeaguers] = useState([]);
    const [users, setUsers] = useState([]);
    
    // user info
    const userRole = localStorage.getItem('role');
    const userName = localStorage.getItem('name');

    // functions
    const login = async (data) => {
        const res = await makeRequest('post', `${base_URL}user/login`, data);

        console.log(res);

        if (res.auth) {
            const {token, name, role} = res.auth;
            localStorage.setItem('role', role);
            localStorage.setItem('name', name)
            localStorage.setItem('token', token);
        }

        else {
            setErrorMessage(res);
        }

    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        goToLogin(navigate);
    };
    
    const signup = async (data) => {
        const res = await makeRequest('post', `${base_URL}user/signup`, data, header);

        if (res.auth) {
            goToMenu(navigate)
        }

        else {
            console.log(res);
            setErrorMessage(res);
        }  
    };

    const leaguersSignup = async (data) => {
        const res = await makeRequest('post', `${base_URL}leaguers/create`, data, header);
        
        if (res.message) {
            setMessage(res.message);
            goToMenu(navigate);
        }

        else {
            setErrorMessage(res);
        }
    }

    const getLeaguers = async () => {
        const res = await makeRequest('get', `${base_URL}leaguers`, header);

        setLeaguers(res);
    };

    const getUsers = async () => {
        const res = await makeRequest('get', `${base_URL}user`, header);

        setUsers(res);
    };  

    const value = { 
        isLoading, 
        userRole, 
        userName, 
        errorMessage, 
        login, 
        logout, 
        signup, 
        leaguersSignup, 
        getLeaguers, 
        getUsers,
        leaguers,
        users 
    };

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
};
export default GlobalState;