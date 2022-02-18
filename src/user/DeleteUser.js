import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteAccount, isAuthenticated, logout } from "../auth/auth";

const DeleteUser = ({ userId }) => {
	let navigate = useNavigate();

	const deleteConfirmed = () => {
		let answer = window.confirm("Are you sure you want to delete this user?");

		if (answer) {
			deleteAccount(userId).then((data) => {
				if (data.status === 200) {
					logout().then((data) => {
						if (data.status === 200) {
							navigate("/signin");
						}
					});
				}
			});
		}
	};

	return (
		<button onClick={deleteConfirmed} className='btn btn-outline-danger'>
			Delete Profile
		</button>
	);
};

export default DeleteUser;
