import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-secondary bg-opacity-50 py-4">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Wanna test your JWT tokens?</span>
				</Link>
			</div>
		</nav>
	);
};
