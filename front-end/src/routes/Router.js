import GlobalState from "../Global/GlobalState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import MenuPage from "../pages/MenuPage/MenuPage";

const Router = () => {
  return (
    <BrowserRouter>
      <GlobalState>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/cadastro" element={<SignUpPage/>} />
        <Route path="/menu" element={<MenuPage/>} />
        <Route path="/*" element={<ErrorPage/>} />
      </Routes>
      </GlobalState>
    </BrowserRouter>
  )
}

export default Router