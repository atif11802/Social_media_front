import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./core/Home";
import Users from "./core/Users";
import EditProfile from "./user/EditProfile";
import Profile from "./user/Profile";
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import PrivateRoute from "./auth/PrivateRoute";
import FindPeople from "./user/FindPeople";
import NewPost from "./post/NewPost";
import SinglePost from "./post/SinglePost";
import EditPost from "./post/EditPost";

const MainRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/signin' element={<SignIn />} />
				<Route
					path='/users'
					element={
						<PrivateRoute>
							<Users />
						</PrivateRoute>
					}
				/>
				<Route
					path='/user/:userId'
					element={
						<PrivateRoute>
							<Profile />
						</PrivateRoute>
					}
				/>
				<Route
					path='/user/edit/:userId'
					element={
						<PrivateRoute>
							<EditProfile />
						</PrivateRoute>
					}
				/>
				<Route
					path='/findPeople'
					element={
						<PrivateRoute>
							<FindPeople />
						</PrivateRoute>
					}
				/>
				<Route
					path='/newPost'
					element={
						<PrivateRoute>
							<NewPost />
						</PrivateRoute>
					}
				/>
				<Route path='/post/:postId' element={<SinglePost />} />
				<Route
					path='/post/edit/:postId'
					element={
						<PrivateRoute>
							<EditPost />
						</PrivateRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default MainRouter;
