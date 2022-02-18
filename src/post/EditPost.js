import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout";
import { singlePost, updatePost } from "./postApi";

const EditPost = () => {
	const { postId } = useParams();
	const [postData, setPostData] = useState({
		title: "",
		body: "",
		userId: "",
	});

	const [message, setMessage] = useState(null);

	const { title, body, userId } = postData;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPostData({ ...postData, [name]: value });
	};

	useEffect(() => {
		singlePost(postId).then((res) => {
			if (res.status === 200) {
				setPostData({
					title: res.data.title,
					body: res.data.body,
					userId: res.data.postedBy._id,
				});
			}
		});
	}, [postId]);

	const submitPost = () => {
		updatePost(postId, { title, body }).then((res) => {
			if (res.status === 200) {
				setMessage("sucessfully updated your post");
			}
		});
	};

	return (
		<Layout>
			<div className='container mt-3'>
				{message && (
					<p className='bg-dark text-success text-center'>{message}</p>
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

export default EditPost;
