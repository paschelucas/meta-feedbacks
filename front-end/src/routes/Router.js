import GlobalState from "../Global/GlobalState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SignUpPage from "../Pages/SignUpPage/SignUpPage"
import MenuPage from "../Pages/MenuPage/MenuPage";
import LeaguersListPage from '../Pages/LeaguersListPage/LeaguersListPage'
import LeaguersSignupPage from '../Pages/LeaguersSignupPage/LeaguersSignupPage';
import ColaboratorsListPage from '../Pages/ColaboratorsListPage/ColaboratorsListPage';
import EvaluationProcess from "../Pages/EvaluationProcess/EvaluationProcess";
=======
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import LeaguersListPage from "../pages/LeaguersListPage/LeaguersListPage";
import LeaguersSignUpPage from "../pages/LeaguersSignupPage/LeaguersSignupPage";
import ColaboratorsListPage from "../pages/ColaboratorsListPage/ColaboratorsListPage";
import MenuPage from "../pages/MenuPage/MenuPage";
import EvaluationProcess from "../pages/EvaluationProcess/EvaluationProcess";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage"

>>>>>>> dc6c71df29c12a1e234517f6eab2c41f1ef25eb8

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalState>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/cadastro" element={<SignUpPage/>} />
        <Route path="/leaguers" element={<LeaguersListPage/>}/>
        <Route path="/leaguers/cadastro" element={<LeaguersSignUpPage/>}/>
        <Route path="/colaboradores" element={<ColaboratorsListPage/>}/>
        <Route path="/menu" element={<MenuPage/>} />
        {/* Perguntar pro Brito */}
        <Route path="/avaliacao" element={<EvaluationProcess/>}/>
        <Route path="/*" element={<ErrorPage/>} />
        
      </Routes>
      </GlobalState>
    </BrowserRouter>
  )
}

export default Router