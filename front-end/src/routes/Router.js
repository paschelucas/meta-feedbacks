import GlobalState from "../Global/GlobalState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import MenuPage from "../pages/MenuPage/MenuPage";
import EvaluationProcess from "../pages/EvaluationProcess/EvaluationProcess";
import LeaguersListPage from "../pages/LeaguersListPage/LeaguersListPage";
import UserOptions from "../pages/userOptions/UserOptions";


const Router = () => {
  return (
    <BrowserRouter>
      <GlobalState>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/cadastro" element={<SignUpPage/>} />
        <Route path="/menu" element={<MenuPage/>} />
        <Route path="/leaguers" element={<LeaguersListPage/>}/>
        <Route path="/user_options" element={<UserOptions/>}/>
        <Route path="/evolucao_processo" element={<EvaluationProcess/>}/>
        <Route path="/*" element={<ErrorPage/>} />
        
      </Routes>
      </GlobalState>
    </BrowserRouter>
  )
}

export default Router