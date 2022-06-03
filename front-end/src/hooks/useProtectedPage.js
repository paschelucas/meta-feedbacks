import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { goToMenu } from "../routes/coordinator";

const useProtectedPage = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            goToMenu(navigate);
        }
    },[]);
};
export default useProtectedPage;