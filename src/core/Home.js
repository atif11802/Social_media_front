import React from "react";
import Layout from "../Layout";
import Post from "../post/Post";

const Home = () => {
	return (
		<Layout>
			<div className='container'>
				<Post />
			</div>
		</Layout>
	);
};

export default Home;
