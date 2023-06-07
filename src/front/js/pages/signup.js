import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import getState from "../store/flux";
import { useState } from "react";



export const Signup = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {store, actions} = useContext(Context)

    const navigate = useNavigate()


    const handleNewUser = (event) => {
        event.preventDefault()
        actions.getNewUser(email, password)
    }



    return (
        <div className="signup-container">
        <h1 className="d-flex justify-content-center p-5">Enter your details to register</h1>
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
                        <input type="password" className="form-control border border-3 rounded" id="inputPassword" placeholder="Enter your password" value={password}
                        onChange={(event) => setPassword(event.target.value)}/>
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

        </div>
        </div>
    )

}



    // const handleOnClick = () => {
    //     navigate("/login")
    // }


    

                   {/* <div className="row d-flex justify-content-center m-2 p-2">
                    <div className="col-10 d-flex justify-content-center">
                        <h4 className="m-2 p-2">Already have an account? Ok, then we should have your details. Click here!</h4>
                        <button type="submit" className="btn btn-lg btn-warning fw-bold" onClick={handleOnClick}>
                            Log in
                        </button>
                    </div>
                    </div> */}