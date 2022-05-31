import GlobalState from "../Global/GlobalState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage"
import MenuPage from "../Pages/MenuPage/MenuPage";
import LeaguersListPage from '../Pages/LeaguersListPage/LeaguersListPage'
import LeaguersSignupPage from '../Pages/LeaguersSignupPage/LeaguersSignupPage';
import ColaboratorsListPage from '../Pages/ColaboratorsListPage/ColaboratorsListPage';
import EvaluationProcess from "../Pages/EvaluationProcess/EvaluationProcess";

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalState>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/cadastro" element={<SignUpPage/>} />
        <Route path="/leaguers" element={<LeaguersListPage/>}/>
        <Route path="/leaguers/cadastro" element={<LeaguersSignupPage/>}/>
        <Route path="/colaboradores" element={<ColaboratorsListPage/>}/>
        <Route path="/menu" element={<MenuPage/>} />
        <Route path="/leaguers" element={<LeaguersListPage/>}/>
        {/* Perguntar pro Brito */}
        <Route path="/avaliacao" element={<EvaluationProcess/>}/>
        <Route path="/*" element={<ErrorPage/>} />
        
      </Routes>
      </GlobalState>
    </BrowserRouter>
  )
}

export default Router