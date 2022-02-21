import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout";
import { singlePost, updatePost } from "./postApi";
import Slider from "./Slider";

const EditPost = () => {
	const { postId } = useParams();
	const [postData, setPostData] = useState({
		title: "",
		body: "",
		userId: "",
	});
	const [postPictures, setPostPictures] = useState([]);
	const [images, setImages] = useState([]);

	const [message, setMessage] = useState(null);

	const { title, body, userId } = postData;

	const onFileChange = (event) => {
		// Update the state
		setImages({ images: event.target.files });
	};

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
				setPostPictures(res.data.postPictures);
			}
		});
	}, [postId]);

	const submitPost = () => {
		if (title === "" || body === "") {
			return setMessage("Please fill in the required fields");
		}

		const formData = new FormData();
		formData.append("title", title);
		formData.append("body", body);

		if (Object.values(images.images).length > 0) {
			Object.values(images.images).forEach((image) => {
				formData.append("postPictures", image);
			});
		}

		updatePost(postId, formData).then((res) => {
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

				<Slider postPictures={postPictures} />

				<div className='form-group mt-2'>
					<label>Upload Images</label>
					<input
						type='file'
						className='form-control-file'
						id='exampleFormControlFile1'
						multiple
						onChange={onFileChange}
					/>
				</div>
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
