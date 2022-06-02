import GlobalState from "../Global/GlobalState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import LeaguersListPage from "../pages/LeaguersListPage/LeaguersListPage";
import LeaguersSignUpPage from "../pages/LeaguersSignupPage/LeaguersSignupPage";
import ColaboratorsListPage from "../pages/ColaboratorsListPage/ColaboratorsListPage";
import MenuPage from "../pages/MenuPage/MenuPage";
import EvaluationProcess from "../pages/EvaluationProcess/EvaluationProcess";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage"


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