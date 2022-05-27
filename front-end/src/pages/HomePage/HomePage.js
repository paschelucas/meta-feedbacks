import React from "react"; 
import { useNavigate } from "react-router-dom";
import { goToLogin } from "../../routes/coordinator";

const HomePage = () => {
  const navigate = useNavigate();

  setTimeout(()=>{
    goToLogin(navigate);
  }, 1250)

  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

export default HomePage