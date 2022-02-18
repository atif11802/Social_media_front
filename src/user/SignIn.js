import React, { useState } from "react";
import { MDBInput, MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import instance from "../axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loading from "../Screens/Loading";
import Layout from "../Layout";
import { Signin } from "../auth/auth";

const SignIn = () => {
	const navigate = useNavigate();
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [loading, setLoading] = useState(null);

	const changeHandler = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		setLoading(true);

		Signin(userData).then((res) => {
			if (res.response && res.response.data.err) {
				setError(res.response.data.err);
				setLoading(false);
			}

			if (res.status === 200) {
				setUserData({
					email: "",
					password: "",
				});
				setLoading(false);
				localStorage.setItem("token", JSON.stringify(res.data));
				navigate("/");
			}
		});
	};

	const handleError = () => {
		setError(null);
	};

	return (
		<Layout>
			<div className='container mt-5 '>
				<h2 className='text-center'>Sign In</h2>
				{error && (
					<p className='text-danger bg-dark p-2 text-center'>{error}</p>
				)}
				{success && (
					<p className='text-success bg-dark p-2 text-center'>{success}</p>
				)}
				{loading && <Loading />}
				<form onSubmit={submitHandler} className='mt-1'>
					<MDBInput
						onClick={handleError}
						className='mb-4'
						type='email'
						id='form1Example1'
						label='Email address'
						name='email'
						onChange={changeHandler}
						value={userData.email}
					/>
					<MDBInput
						onClick={handleError}
						className='mb-4'
						type='password'
						id='form1Example2'
						label='Password'
						name='password'
						value={userData.password}
						onChange={changeHandler}
					/>

					<MDBRow className='mb-4'>
						<MDBCol>
							<Link to=''>Forgot password?</Link>
						</MDBCol>
					</MDBRow>

					<MDBBtn type='submit' block>
						Sign Up
					</MDBBtn>
				</form>
			</div>
		</Layout>
	);
};

export default SignIn;
