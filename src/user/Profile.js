import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	callApi,
	getUserDetails,
	isAuthenticated,
	unFollow,
} from "../auth/auth";
import Layout from "../Layout";
import { getPostsById } from "../post/postApi";
import DeleteUser from "./DeleteUser";
import FollowProfileButton from "./FollowProfileButton";
import ProfileTabs from "./ProfileTabs";

const Profile = () => {
	const { userId } = useParams();
	const [user, setUser] = useState({});
	const [posts, setPosts] = useState([]);
	const [following, setFollowing] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		getUserDetails(userId).then((res) => {
			if (res.status === 200) {
				let following = checkFollow(res.data[0]);
				setFollowing(following);
				return setUser(res.data[0]);
			}
		});
		getPostsById(userId).then((res) => {
			if (res.status === 200) {
				return setPosts(res.data);
			}
		});
	}, [userId, navigate]);

	console.log("posts", posts);
	// console.log(isAuthenticated().user._id, userId);

	const checkFollow = (user) => {
		const jwt = isAuthenticated();

		const match = user?.followers.find((follower) =>
			// one id has many other ids (followers) and vice versa

			{
				// console.log(follower._id === jwt.user._id);
				return follower._id === jwt.user._id;
			}
		);

		return match;
	};

	// console.log(following);
	const clickFollowButton = () => {
		callApi(isAuthenticated().user._id, user?._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setUser(data.data);
				setFollowing(true);
				console.log(data);
			}
		});
	};

	const unFollowButton = () => {
		unFollow(isAuthenticated().user._id, user?._id).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setUser(data.data);
				setFollowing(false);
				console.log(data);
			}
		});
	};

	// console.log();

	return (
		<Layout>
			<div className='container'>
				<div className='mt-5 mb-3'>
					<h1>Profile</h1>
				</div>
				<div className='row'>
					<div className='col-md-6'>
						<img
							src='https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
							className='img-fluid'
							alt='...'
						></img>
					</div>
					<div className='col-md-6'>
						<div className='lead mt-2 ml-3'>
							<p>Hello {user && user.name}</p>
							<p>About: {user && user.email}</p>
							<p>
								{user && `created ${new Date(user.createdAt).toDateString()}`}
							</p>
						</div>

						{isAuthenticated().user && isAuthenticated().user._id === userId ? (
							<div className='d-online-block mt-5'>
								<Link
									className='btn btn-outline-light mr-5'
									to={`/user/edit/${userId}`}
								>
									Edit Profile
								</Link>
								<DeleteUser userId={user?._id} />
							</div>
						) : (
							<FollowProfileButton
								user={user}
								checkFollow={checkFollow}
								clickFollowButton={clickFollowButton}
								following={following}
								unFollowButton={unFollowButton}
							/>
							// <h1>{following ? "following" : "not follow"}</h1>
						)}
					</div>
				</div>

				<div className='row'>
					<div className='col md-12 mt-5 mb-5'>
						<hr />
						<p className='lead'>{user.about}</p>
						<hr />
						<ProfileTabs user={user} posts={posts} />
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Profile;
