import GlobalContext from "./GlobalContext";
import useRequest from '../hooks/useRequest.js';
import { goToLeaguerProfile, goToLogin, goToMenu } from "../routes/coordinator";
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
    const [searchInput, setSearchInput] = useState("");
    const [projects, setProjects] = useState([]);
    const [questions, setQuestions] = useState([]);
    
    // user info
    const userRole = localStorage.getItem('role');
    const userName = localStorage.getItem('name');

    // user related functions
    const login = async (data) => {
        const res = await makeRequest('post', `${base_URL}user/login`, data);

        if (res.auth) {
            const {token, name, role} = res.auth;
            localStorage.setItem('role', role);
            localStorage.setItem('name', name)
            localStorage.setItem('token', token);
            goToMenu(navigate);
        }

        else {
            setErrorMessage(res);
        }

    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        localStorage.removeItem('leaguer');
        goToLogin(navigate);
    };
    
    const signup = async (data) => {
        const res = await makeRequest('post', `${base_URL}user/signup`, data, header);

        if (res.auth) {
            setMessage(res.message);
            goToMenu(navigate)
        }

        else {
            setErrorMessage(res);
        }  
    };
    
    const getUsers = async () => {
        const res = await makeRequest('get', `${base_URL}user`, header);

        setUsers(res);
    };  

    const editUserRole = async (data, userName, close) => {
        
        const {newRole} = data;
        
        const body = {
            userName,
            newRole
        };
        
        const res = await makeRequest('put', `${base_URL}user/role`, body, header);

        setMessage(res.message);

        
        close();
    };

    // Leaguers related functions
    const leaguersSignup = async (data) => {
        const res = await makeRequest('post', `${base_URL}leaguers/create`, data, header);
        
        if (res.message) {
            setMessage(res.message);
            goToMenu(navigate);
        }

        else {
            setErrorMessage(res);
        }
    };

    const getLeaguers = async () => {
        const res = await makeRequest('get', `${base_URL}leaguers`, header);
        setLeaguers(res.leaguers);
    };

    const getLeaguerProfile = (leag) => {
        localStorage.setItem('leaguer', JSON.stringify(leag));
        goToLeaguerProfile(navigate);
    };

    // Other functions
    const onChangeSearch = (evt) => {
        setSearchInput(evt.target.value);
    };
    
    const getProjects = async () => {
        const res = await makeRequest('get', `${base_URL}project/`,header);
        setProjects(res.projects);
    };

    const addLeaguerInProject = async (data, userId, close) => {
        const res = await makeRequest('post', `${base_URL}projects-and-leaguers/${data.project}/insert`, {leaguerId: userId}, header);

        console.log(res);

        close();
    };

    const createNewProject = async (data, close) => {
        const res = await makeRequest('post', `${base_URL}project/create`, data, header);

        setMessage(res.message);

        close();
    };

    const getQuestions = async () => {
        const res = await makeRequest('get', `${base_URL}question`, header);

        setQuestions(res.questions);
    };

    const sendChoosenQuestions = async (data) => {
        // finish after do the crate form function
        console.log(data);
    };

    const value = { 
        isLoading,
        searchInput,
        onChangeSearch, 
        userRole, 
        userName,
        message, 
        errorMessage, 
        login, 
        logout, 
        signup, 
        leaguersSignup, 
        getLeaguers,
        getLeaguerProfile, 
        getUsers,
        leaguers,
        users,
        editUserRole,
        getProjects,
        projects,
        addLeaguerInProject,
        createNewProject,
        getQuestions,
        questions,
        sendChoosenQuestions
    };
    
    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
};
export default GlobalState;