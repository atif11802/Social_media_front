import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../auth/auth";
import instance from "../axios";

const Menu = () => {
	let navigate = useNavigate();

	const signout = () => {
		if (typeof window !== "undefined") {
			localStorage.removeItem("token");
		}
		logout().then((data) => {
			if (data.status === 200) {
				navigate("/signin");
			}
		});
	};

	// console.log(isAuthenticated().user.name);
	return (
		<nav className='navbar navbar-expand-lg navbar-light bg-light'>
			<div className='container-fluid'>
				<Link className='navbar-brand' to='/'>
					Home
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarColor03'
					aria-controls='navbarColor03'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</button>

				<div className='collapse navbar-collapse' id='navbarColor03'>
					<ul className='navbar-nav me-auto'>
						{/* <li className='nav-item'>
							<Link className='nav-link active' to='/'>
								Home
							</Link>
						</li> */}
					</ul>
					<form className='d-flex'>
						<ul className='navbar-nav me-auto'>
							{!isAuthenticated() && (
								<Fragment>
									<li className='nav-item'>
										<Link className='nav-link' to='/signin'>
											Sign in
										</Link>
									</li>
									<li className='nav-item'>
										<Link className='nav-link' to='/signup'>
											Sign up
										</Link>
									</li>
								</Fragment>
							)}
							{isAuthenticated() && (
								<>
									<li className='nav-item'>
										<Link className='nav-link' to='/users'>
											Users
										</Link>
									</li>
									<li className='nav-item'>
										<Link
											className='nav-link'
											to={`/user/${isAuthenticated().user._id}`}
										>
											{`${isAuthenticated().user.name}'s profile`}
										</Link>
									</li>
									<li className='nav-item'>
										<Link className='nav-link' to='/newPost'>
											Create Post
										</Link>
									</li>
									<li className='nav-item'>
										<Link className='nav-link' to={`/findPeople`}>
											Find People
										</Link>
									</li>
									<li className='nav-item'>
										<p
											className='nav-link'
											style={{
												cursor: "pointer",
											}}
											onClick={signout}
										>
											Sign out
										</p>
									</li>
								</>
							)}
						</ul>
					</form>
				</div>
			</div>
		</nav>
	);
};

export default Menu;
