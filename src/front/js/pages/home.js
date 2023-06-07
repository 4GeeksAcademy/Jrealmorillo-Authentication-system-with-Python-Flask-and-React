import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";



export const Home = () => {

    const navigate = useNavigate()

    const handleOnClick = () => {
        navigate("/signup")
    }

    return (

        <div className="home-container">
            <h1 className="d-flex justify-content-center p-5">Welcome to the Authentication System</h1>
            <div className="row d-flex justify-content-center m-2 p-2">
                <div className="col-6 d-flex justify-content-center">
                <button type="button" className="btn btn-lg btn-danger" onClick={handleOnClick}>Click to start</button>
                </div>
                </div>
        </div>
        
    )

}
