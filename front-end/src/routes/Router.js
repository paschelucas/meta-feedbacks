import GlobalState from "../Global/GlobalState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SignUpPage from "../Pages/SignUpPage/SignUpPage";
import LeaguersListPage from "../Pages/LeaguersListPage/LeaguersListPage";
import LeaguersSignUpPage from "../Pages/LeaguersSignupPage/LeaguersSignupPage";
import CollaboratorsListPage from "../Pages/CollaboratorsListPage/CollaboratorsListPage";
import MenuPage from "../Pages/MenuPage/MenuPage";
import EvaluationProcess from "../Pages/EvaluationProcess/EvaluationProcess";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import HomePage from "../Pages/HomePage/HomePage"
import LeaguerProfilePage from "../Pages/LeaguerProfilePage/LeaguerProfilePage";
import ProjectPage from "../Pages/ProjectPage/ProjectPage";


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