import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


export const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { store, actions } = useContext(Context)

    const navigate = useNavigate()


    const handleSubmit = (event) => {
        event.preventDefault()
        if (actions.logInUser(email, password)) {
            navigate("/private")
        }
        else {
            alert("User not logged in")
        }
    }
    



    return (
        <div className="login-container d-flex flex-column align-items-center justify-content-center">
            <h2 className="d-flex justify-content-center pt-5">Nice to see you again!</h2>
            <h2 className="d-flex justify-content-center m-2 p-2">Please enter your details to Log in</h2>
        
            <div className="container align-items-center">
                <form onSubmit={handleSubmit}>
                    <div className="row d-flex justify-content-center m-2 p-2">
                        <div className="col-6">
                            <label htmlFor="inputEmail" className="form-label fw-bold">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control border border-3 rounded"
                                id="inputEmail"
                                placeholder="Enter your email"
                                autoComplete="username"
                                required
                                value={email}
                                onChange={(event) => setEmail(event.target.value)} />
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center m-2 p-2">
                        <div className="col-6">
                            <label htmlFor="inputPassword" className="form-label fw-bold">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control border border-3 rounded"
                                id="inputPassword"
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(event) => setPassword(event.target.value)} />
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center m-3 p-3">
                        <div className="col- d-flex justify-content-center">
                            <button type="submit" className="btn btn-lg btn-warning fw-bold">
                                Log in
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            
        </div>
    )
}


