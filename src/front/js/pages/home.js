import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Signup } from "./signup.jsx";
import { Login } from "./login.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const OnPage = ({ current_user }) => {
		return (
			<div className="row m-5 row-cols-1 justify-content-center bg-secondary bg-opacity-25">
				<h2 className="my-3 col-8">Hey! seems like you already logged in, nice!</h2>
				<h4 className="my-3 col-8">Welcome {current_user.email}!</h4>
				<h5 className="my-3 col-8 overflow-auto">Your token is {store.access_token}</h5>
				<h6 className="my-3 col-8">This was fun but it's time to logout...</h6>
				<div className="text-center my-4 col-2 mx-auto">
					<button className="btn btn-primary" onClick={() => {actions.logout()}}>Logout</button>
				</div>
				
			</div>
		)
	}

	return (
		<div className="text-center mt-5">
			<h1 className="my-3">We're gonna try some authentication procedures...</h1>
			{(store.access_token!="") ? <OnPage current_user={store.current_user} /> : 
				(store.alreadytaken == "" ? <Signup /> : <Login /> )}
		</div>
	);
};
