import GlobalState from "../Global/GlobalState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/LoginPage/LoginPage.js";
import SignUpPage from "../Pages/SignUpPage/SignUpPage.js";
import LeaguersListPage from "../Pages/LeaguersListPage/LeaguersListPage.js";
import LeaguersSignUpPage from "../Pages/LeaguersSignupPage/LeaguersSignupPage.js";
import CollaboratorsListPage from "../Pages/CollaboratorsListPage/CollaboratorsListPage.js";
import MenuPage from "../Pages/MenuPage/MenuPage.js";
import EvaluationProcess from "../Pages/EvaluationProcess/EvaluationProcess.js";
import ErrorPage from "../Pages/ErrorPage/ErrorPage.js";
import HomePage from "../Pages/HomePage/HomePage.js"
import LeaguerProfilePage from "../Pages/LeaguerProfilePage/LeaguerProfilePage.js";
import ProjectPage from "../Pages/ProjectPage/ProjectPage.js";


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