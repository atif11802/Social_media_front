import React, { useEffect, useState } from "react";
import { isAuthenticated, listUser } from "../auth/auth";
import Layout from "../Layout";
import Card from "../Screens/Card";
import { getPost } from "./postApi";
import PostCard from "./PostCard";

const Post = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		getPost().then((data) => {
			if (data.status === 200) {
				return setPosts(data.data.posts);
			}
			if (data.error) {
				console.log(data.error);
			}
		});
	}, []);

	// console.log(posts);

	return (
		<div className='container'>
			<h2 className='mt-3 mb-5'>Recent posts</h2>
			<div className='mt-5 mb-5'>
				<div className='row'>
					{posts.map((post) => (
						<PostCard key={post._id} post={post} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Post;
