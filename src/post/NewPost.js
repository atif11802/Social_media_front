import React, { useState } from "react";
import { isAuthenticated } from "../auth/auth";
import Layout from "../Layout";
import { create } from "./postApi";

const NewPost = () => {
	const [postData, setPostData] = useState({
		title: "",
		body: "",
		userId: "",
	});
	const [message, setMessage] = useState(null);

	const { title, body } = postData;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPostData({ ...postData, [name]: value });
	};

	const submitPost = () => {
		const postedBy = isAuthenticated().user._id;

		if (title === "" && body === "") {
			return setMessage("Please fill in the required fields");
		}

		create({ ...postData, postedBy }).then((data) => {
			if (data.status === 200) {
				setMessage(data.data);
				setPostData({
					title: "",
					body: "",
				});
			}
		});
	};

	return (
		<Layout>
			<div className='container mt-3'>
				{message && (
					<p className='bg-dark text-success text-center'>
						Successfully posted
					</p>
				)}
				<div className='mb-3'>
					<label className='form-label'>Title</label>
					<input
						onChange={handleChange}
						type='text'
						className='form-control'
						id='exampleFormControlInput1'
						name='title'
						placeholder='Title'
						value={title}
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>Post body</label>
					<textarea
						name='body'
						onChange={handleChange}
						className='form-control'
						id='exampleFormControlTextarea1'
						rows='3'
						value={body}
					></textarea>
				</div>
				<button
					onClick={submitPost}
					type='button'
					className='btn btn-outline-dark'
				>
					post
				</button>
			</div>
		</Layout>
	);
};

export default NewPost;
