import { useNavigate } from "react-router-dom";
import { goToMenu } from "../routes/coordinator";

const useProtectedPage = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    if (token) {
        goToMenu(navigate);
    }
};
export default useProtectedPage;