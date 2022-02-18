import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/auth";
import { commentPost } from "./postApi";

const Comment = ({ postId, comments, run, setRun }) => {
	const [text, setText] = useState("");
	const [error, setError] = useState("");

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const addComment = (e) => {
		e.preventDefault();

		if (text.trim() === "") {
			return setError("Comment cannot be empty");
		}

		// console.log(postId, text, isAuthenticated().user._id);

		commentPost(isAuthenticated().user._id, postId, text).then((res) => {
			if (res.status === 200) {
				// console.log(res);
				setRun(!run); // run useEffect in SinglePost.js
				setText("");
				setError("");
			}
		});
	};

	// console.log(comments);

	return (
		<div>
			<h2 className='mt-5 mb-5'>leave a comment</h2>
			{error && <div className='alert alert-danger'>{error}</div>}
			<form onSubmit={addComment} className='mb-1'>
				<div className='form-group'>
					<input
						placeholder='Your Comment'
						className='form-control'
						type='text'
						onChange={handleChange}
						value={text}
					/>
				</div>
			</form>
			<table className='table table-hover '>
				<thead>
					<tr>
						<th scope='col'>User</th>
						<th scope='col'>Comments</th>
					</tr>
				</thead>
				<tbody>
					{comments.map((comment) => (
						<tr key={comment._id} className='table-dark'>
							<th scope='row'>
								<Link to={`/user/${comment.postedBy?._id}`}>
									{comment.postedBy?.name}
								</Link>
							</th>
							<td>{comment?.text}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Comment;
