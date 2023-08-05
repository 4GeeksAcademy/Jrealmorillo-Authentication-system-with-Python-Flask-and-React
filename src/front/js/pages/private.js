import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const token = store.user.token;


  const handleLogout = () => {
    actions.userLogOut()
    navigate("/");
  }

  return (

    <div className="private-container">
      {token ? (
        <>
          <nav className="navbar navbar-expand-lg navbar-dark shadow-5-strong p-5">
            <div className="container-fluid justify-content-end">
              <button className="btn btn-lg btn-success fw-bold" type="button" onClick={handleLogout}>
                Log out
              </button>
            </div>
          </nav>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h2 className="d-flex justify-content-center p-5">Welcome to your private area!</h2>
            <h2 className="d-flex justify-content-center p-5">Go take a sit...</h2>
            <h2 className="d-flex justify-content-center p-5">...grab a drink...</h2>
            <h2 className="d-flex justify-content-center p-5">...and play videogames!!</h2>
          </div>
        </>) : <> 
      </>}
    </div>





  );
}








