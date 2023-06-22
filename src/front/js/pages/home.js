import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => { 

    const navigate = useNavigate();

    return (
        <div className="home-container d-flex flex-column align-items-center justify-content-center">
            <h1 className="d-flex justify-content-center p-5 fw-bold">Click here to create a new account</h1>
            <div className="container align-items-center">
                    <div className="row d-flex justify-content-center m-2 p-2">
                        <div className="col-6 d-flex justify-content-center">
                            <button type="button" className="btn btn-lg btn-primary fw-bold" onClick={() => navigate("/signup")}>
                                Sign up
                            </button>
                        </div>
                    </div>
                <div className="row d-flex justify-content-center m-5 p-5">
                    <div className="col-16 d-flex justify-content-center">
                    <h1 className="d-flex justify-content-center p-5 fw-bold">Click here if you already have an account</h1>
                    </div>
                    <div className="col-16 d-flex justify-content-center">
                        <button type="button" className="btn btn-lg btn-warning fw-bold" onClick={() => navigate("/login")}>
                            Log-in
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )

}
