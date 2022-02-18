import React, { useEffect, useState } from "react";
import { isAuthenticated, listUser } from "../auth/auth";
import Layout from "../Layout";
import Card from "../Screens/Card";

const Users = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		listUser().then((data) => {
			if (data.status === 200) {
				return setUsers(data.data);
			}
			if (data.error) {
				console.log(data.error);
			}
		});
	}, []);

	return (
		<Layout>
			<div className='container'>
				<div className='mt-5 mb-5'>
					<div className='row'>
						{users &&
							users
								.filter((user) => user._id !== isAuthenticated().user._id)
								.map((user) => (
									<Card
										key={user._id}
										id={user._id}
										name={user.name}
										email={user.email}
										createdAt={user.createdAt}
									/>
								))}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Users;
