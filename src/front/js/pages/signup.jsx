import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Login } from "./login.jsx"


export const Signup = () => {
    const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    if (store.created) {
        return (<Login />)
    } else {
        return (
            <div className="row m-5 row-cols-1 justify-content-center bg-secondary bg-opacity-25">
            <h1 className="col-8 my-3">Wanna try signing up first?</h1>
                <form className="col-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="my-4 d-flex">
                        <label htmlFor="inputEmailSignup" className="form-label me-4 text-start text-secondary align-self-center">Email</label>
                        <input type="email" className="ms-5 form-control" id="inputEmailSignup" aria-describedby="emailHelp" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="my-4 d-flex">
                        <label htmlFor="inputPasswordSignup" className="form-label me-4 text-secondary align-self-center">Password</label>
                        <input type="password" className="ms-5 form-control" id="inputPasswordSignup" placeholder="Example123" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="text-center my-3">
                        <button className="btn btn-success mb-3" onClick={() => {
                            if (email === "" || password === "") {
                                alert("seems like you lack information yet...")
                            } else {
                                actions.signup(email, password)
                            }}}>Sign Up</button>
                    </div>
                </form>
            </div>
        )
    }
}