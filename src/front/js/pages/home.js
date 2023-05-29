import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

	return (
		<div className="text-center mt-5">
			<h1>Hey! let's try a signup first:</h1>
				{(store.current_user!="" && store.current_user!=undefined && store.current_user) ?
				(<p>Hey! you're already signed up! and this is your email: {store.current_user}!</p>) :
				(<div>
					<form onSubmit={(e) => e.preventDefault()}>
					<div className="my-3">
                        <label htmlFor="exampleInputEmail2" className="form-label text-center text-light">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <div id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</div>
                    </div>
					<div className="mb-3">
                    	<label htmlFor="exampleInputPassword2" className="form-label text-light">Password</label>
						<input type="password" className="form-control" id="exampleInputPassword2" placeholder="Example123" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
					<div className="text-center">
                            <button className="btn btn-success mb-3" onClick={() => {
                                if (email === "" || password === "") {
                                    alert("seems like you lack information yet...")
                                }
                                else {
                                    actions.signup(email, password)
                                }
                            }}>signup</button>
                        </div>
					</form>
				</div>)}
		</div>
	);
};
