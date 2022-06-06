import GlobalState from "../Global/GlobalState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage.js";
import SignUpPage from "../pages/SignUpPage/SignUpPage.js";
import LeaguersListPage from "../pages/LeaguersListPage/LeaguersListPage.js";
import LeaguersSignUpPage from "../pages/LeaguersSignupPage/LeaguersSignupPage.js";
import CollaboratorsListPage from "../pages/CollaboratorsListPage/CollaboratorsListPage.js";
import MenuPage from "../pages/MenuPage/MenuPage.js";
import EvaluationProcess from "../pages/EvaluationProcess/EvaluationProcess.js";
import ErrorPage from "../pages/ErrorPage/ErrorPage.js";
import HomePage from "../pages/HomePage/HomePage.js"
import LeaguerProfilePage from "../pages/LeaguerProfilePage/LeaguerProfilePage.js";
import ProjectPage from "../pages/ProjectPage/ProjectPage.js";


const Router = () => {
  return (
    <BrowserRouter>
      <GlobalState>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/cadastro" element={<SignUpPage/>} />
        <Route path="/leaguers" element={<LeaguersListPage/>}/>
        <Route path="/leaguers/profile" element={<LeaguerProfilePage/>}/>
        <Route path="/leaguers/cadastro" element={<LeaguersSignUpPage/>}/>
        <Route path="/colaboradores" element={<CollaboratorsListPage/>}/>
        <Route path="/menu" element={<MenuPage/>} />
        {/* Perguntar pro Brito */}
        <Route path="/avaliacao" element={<EvaluationProcess/>}/>
        <Route path="/projetos" element={<ProjectPage/>}/>
        <Route path="/*" element={<ErrorPage/>} />
        
      </Routes>
      </GlobalState>
    </BrowserRouter>
  )
}

export default Router