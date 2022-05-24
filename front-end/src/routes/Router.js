import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>

        <Route path="/" element={<LoginPage/>} />
        <Route path="/cadastro" element={<SignUpPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/*" element={<ErrorPage/>}/>
      </Routes>
      
    </BrowserRouter>
  )
}

export default Router