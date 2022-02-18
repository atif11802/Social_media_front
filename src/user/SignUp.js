import React, { useState } from "react";
import { MDBInput, MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import instance from "../axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { Signup } from "../auth/auth";

const SignUp = () => {
	const [userData, setUserData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	const changeHandler = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();

		Signup(userData).then((res) => {
			if (res.response && res.response.data.err) {
				setError(res.response.data.err);
			}

			if (res.status === 200) {
				setSuccess(`
				new user created successfully 
				`);
				setUserData({
					name: "",
					email: "",
					password: "",
				});
			}
		});
	};

	const handleError = () => {
		setError(null);
	};

	return (
		<Layout>
			<div className='container mt-5 '>
				<h2 className='text-center'>Sign Up</h2>
				{error && (
					<p className='text-danger bg-dark p-2 text-center'>{error}</p>
				)}
				{success && (
					<p className='text-success bg-dark p-2 text-center'>
						{success}
						<Link to='/signin' className='badge bg-dark'>
							Sign in
						</Link>
					</p>
				)}
				<form onSubmit={submitHandler} className='mt-1'>
					<MDBInput
						className='mb-4'
						type='text'
						id='form1Example1'
						label='name'
						name='name'
						onChange={changeHandler}
						value={userData.name}
						onClick={handleError}
					/>
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

export default SignUp;
