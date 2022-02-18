import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserDetails, updateUser } from "../auth/auth";
import Layout from "../Layout";
import { MDBInput, MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import Loading from "../Screens/Loading";

const EditProfile = () => {
	const { userId } = useParams();
	const [userData, setUserData] = useState({
		_id: "",
		name: "",
		email: "",
		password: "",
	});
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		getUserDetails(userId).then((res) => {
			if (res.status === 200) {
				return setUserData({
					_id: res.data[0]._id,
					name: res.data[0].name,
					email: res.data[0].email,
					password: "",
					confirmPassword: "",
					about: "",
				});
			}
			console.log(res);
		});
	}, [userId]);

	const changeHandler = (e) => {
		setUserData({ ...userData, [e.target.name]: e.target.value });
	};
	const [error, setError] = useState(null);
	const handleError = () => {
		setError(null);
	};
	const { name, password, email, confirmPassword, about } = userData;

	const submitHandler = (e) => {
		setLoading(true);
		e.preventDefault();
		if (name === "" || email === "") {
			return setError("Please fill all the fields");
		}
		if (password !== confirmPassword) {
			return setError("password and confirm password does not match");
		}

		updateUser(userId, userData).then((updates) => {
			setLoading(false);
			if (updates.status === 200) {
				if (typeof window !== "undefined") {
					let localStorageData = JSON.parse(localStorage.getItem("token"));

					localStorageData.user = updates.data;

					localStorage.setItem("token", JSON.stringify(localStorageData));
				}
				setSuccess(true);
				setUserData({
					_id: updates.data._id,
					name: updates.data.name,
					email: updates.data.email,
					password: "",
					confirmPassword: "",
				});
			}
		});
	};

	// console.log(userData);

	return (
		<Layout>
			<div className='container'>
				<h1 className='mt-5 mb-5'>Profile</h1>
				{error && (
					<p className='text-danger bg-dark p-2 text-center'>{error}</p>
				)}
				{success && (
					<p className='text-success bg-dark p-2 text-center'>
						Profile updated successfully
					</p>
				)}
				{loading && <Loading />}
				<form onSubmit={submitHandler} className='mt-1'>
					<MDBInput
						className='mb-4'
						type='text'
						id='form1Example1'
						label='name'
						name='name'
						onChange={changeHandler}
						value={name}
						onClick={handleError}
					/>
					<MDBInput
						className='mb-4'
						type='text'
						id='form1Example0'
						label='About'
						name='about'
						onChange={changeHandler}
						value={about}
						onClick={handleError}
					/>
					<MDBInput
						onClick={handleError}
						className='mb-4'
						type='email'
						id='form1Example2'
						label='Email address'
						name='email'
						onChange={changeHandler}
						value={email}
					/>
					<MDBInput
						onClick={handleError}
						className='mb-4'
						type='password'
						id='form1Example3'
						label='Password'
						name='password'
						value={password}
						onChange={changeHandler}
					/>
					<MDBInput
						onClick={handleError}
						className='mb-4'
						type='password'
						id='form1Example4'
						label='Confirm Password'
						name='confirmPassword'
						value={confirmPassword}
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

export default EditProfile;
