import React, { useRef, useState } from "react";
import { isAuthenticated } from "../auth/auth";
import Layout from "../Layout";
import { create } from "./postApi";

const NewPost = () => {
	const inputEl = useRef(null);
	const [postData, setPostData] = useState({
		title: "",
		body: "",
		userId: "",
	});
	const [message, setMessage] = useState(null);
	const [postPictures, setPostPictures] = useState([]);

	const onFileChange = (event) => {
		// Update the state
		setPostPictures({ postPictures: event.target.files });
	};

	const { title, body } = postData;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPostData({ ...postData, [name]: value });
	};

	const submitPost = () => {
		const postedBy = isAuthenticated().user._id;

		if (title === "" || body === "") {
			return setMessage("Please fill in the required fields");
		}

		const formData = new FormData();
		formData.append("title", title);
		formData.append("body", body);
		formData.append("postedBy", postedBy);

		if (Object.values(postPictures.postPictures).length > 0) {
			Object.values(postPictures.postPictures).forEach((image) => {
				formData.append("postPictures", image);
			});
		}

		create(formData).then((data) => {
			if (data.status === 200) {
				setMessage("successfully posted");
				setPostData({
					title: "",
					body: "",
				});
				inputEl.current.value = "";
			}
		});
	};

	return (
		<Layout>
			<div className='container mt-3'>
				{message && <p className='bg-dark text-info text-center'>{message}</p>}
				<div className='form-group'>
					<label>Upload Images</label>
					<input
						type='file'
						className='form-control-file'
						id='exampleFormControlFile1'
						multiple
						onChange={onFileChange}
						ref={inputEl}
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

export default NewPost;
