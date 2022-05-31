import React, { useContext, useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { goToLogin } from "../../routes/coordinator";
import { CircularProgress } from "@mui/material";

const HomePage = () => {

  const navigate = useNavigate();

  setTimeout(()=>{
    goToLogin(navigate);
  }, 1250)

  return (
    <>
     <img src="" alt="" />
     <CircularProgress/> 
    </>
  )
}

export default HomePage