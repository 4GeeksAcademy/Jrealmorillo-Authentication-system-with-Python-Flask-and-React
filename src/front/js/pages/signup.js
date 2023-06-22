import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useState } from "react";



export const Signup = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { actions } = useContext(Context)

    const navigate = useNavigate()


    const handleNewUser = (event) => {
        event.preventDefault()
        actions.getNewUser(email, password)
        navigate("/private")
    }


    return (
        <div className="signup-container d-flex flex-column align-items-center justify-content-center">
            <h1 className="d-flex justify-content-center p-5 fw-bold">Enter your details to register</h1>
            <div className="container align-items-center">
                <form onSubmit={handleNewUser}>
                    <div className="row d-flex justify-content-center m-2 p-2">
                        <div className="col-6">
                            <label htmlFor="inputEmail" className="form-label fw-bold">
                                Email
                            </label>
                            <input type="email"
                                className="form-control border border-3 rounded"
                                id="inputEmail"
                                placeholder="Enter your email"
                                autoComplete="usermail"
                                required
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center m-2 p-2">
                        <div className="col-6">
                            <label htmlFor="inputPassword" className="form-label fw-bold">
                                Password
                            </label>
                            <input type="password" 
                                className="form-control border border-3 rounded" 
                                id="inputPassword" 
                                placeholder="Enter your password" 
                                autoComplete="current-password" 
                                required
                                value={password}
                                onChange={(event) => setPassword(event.target.value)} />
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center m-2 p-2">
                        <div className="col-6 d-flex justify-content-center">
                            <button type="submit" className="btn btn-lg btn-primary fw-bold ">
                                Sign up
                            </button>
                        </div>
                    </div>
                </form>
                <div className="row d-flex justify-content-center m-5 p-5">
                    <div className="col-16 d-flex justify-content-center">
                        <p> Already registered?</p>
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



