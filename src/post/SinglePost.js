import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../auth/auth";
import Layout from "../Layout";
import Comment from "./Comment";
import {
	likePost,
	removePost,
	sharePost,
	singlePost,
	unlikePost,
} from "./postApi";
import Slider from "./Slider";
import { ToastContainer, toast } from "react-toastify";

const SinglePost = () => {
	let navigate = useNavigate();
	const { postId } = useParams();
	const [post, setPost] = React.useState({});
	const [like, setLike] = React.useState([]);
	const [likes, setLikes] = React.useState(0);
	const [comments, setComments] = React.useState([]);
	const [run, setRun] = React.useState(false);

	// console.log(postId);

	useEffect(() => {
		singlePost(postId).then((res) => {
			// console.log(res);
			if (res.status === 200) {
				setPost(res.data);
				setLikes(res.data.likes.length);
				setLike(res.data.likes);
				setComments(res.data.comments);
				console.log(res.data.likes);
			}
		});
	}, [postId, run]);

	const handleRemove = () => {
		let text = "Are you sure you want to delete this post?";
		if (window.confirm(text) === true) {
			removePost(postId).then((res) => {
				if (res.status === 200) {
					navigate("/");
				}
			});
		}
	};

	console.log(like?.find((like) => like));

	const likeToggle = () => {
		if (like?.find((like) => like === isAuthenticated()?.user._id)) {
			return unlikePost(isAuthenticated().user?._id, postId).then((res) => {
				// console.log(res);
				if (res.status === 200) {
					setLikes(res.data.likes.length);
					setLike(res.data.likes);
				}
			});
		} else if (
			like?.find((like) => like !== isAuthenticated()?.user?._id) === undefined
		) {
			return likePost(isAuthenticated().user?._id, postId).then((res) => {
				// console.log(res);
				if (res.status === 200) {
					setLikes(res.data.likes.length);
					setLike(res.data.likes);
				}
			});
		}
	};

	const handleShare = () => {
		// console.log(postId, isAuthenticated().user?._id);
		sharePost(postId, isAuthenticated().user?._id).then((res) => {
			if (res.status === 200) {
				toast("shared this post", {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		});
	};
	// console.log(post?.postPictures[0].res);

	return (
		<Layout>
			<div className='container'>
				<h2 className='display-2 mt-5 mb-5'>{post.title}</h2>
				{
					<div
						style={{
							width: "18rem",
							marginBottom: "10px",
							marginRight: "10px",
						}}
					>
						{post?.postPictures?.length > 1 && (
							<Slider postPictures={post.postPictures} />
						)}
						{post?.postPictures?.length === 1 && (
							<img
								style={{ width: "100%", height: "200px" }}
								src={post?.postPictures[0]?.res}
								alt='post'
							/>
						)}
						{/* <img
							src='https://images.unsplash.com/photo-1488842817413-6e197d6d8d53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=910&q=80'
							alt='...'
							style={{ height: "100%", width: "100%", objectFit: "cover" }}
						/> */}
						<h3
							onClick={likeToggle}
							className='mt-3'
							style={{
								cursor: "pointer",
							}}
						>
							{isAuthenticated().user?._id && (
								<div className='d-inline'>
									{likes}{" "}
									{like?.find(
										(like) => like === isAuthenticated().user?._id
									) === undefined ? (
										<i className='fa-solid fa-heart'></i>
									) : (
										<i className='fa-solid fa-thumbs-down'></i>
									)}
								</div>
							)}
						</h3>
						<div className=''>
							{isAuthenticated().user?._id && (
								<div onClick={handleShare} className='d-inline'>
									<i
										style={{
											cursor: "pointer",
											fontSize: "20px",
										}}
										className='fa-solid fa-share-from-square'
									></i>
								</div>
							)}
						</div>
						<p className='card-text'>{post.body}</p>
						<br />
						<p className='font-italic mark'>
							Posted by
							<Link to={`/user/${post?.postedBy?._id}`}>
								{" "}
								{post?.postedBy?.name}
							</Link>
						</p>
						<div className='d-flex justify-content-around'>
							<Link to={"/"} className=' btn btn-outline-dark'>
								back to posts
							</Link>

							{isAuthenticated()?.user &&
								isAuthenticated()?.user._id === post?.postedBy?._id && (
									<>
										<Link
											to={`/post/edit/${post._id}`}
											className='btn btn-outline-dark'
										>
											Update post
										</Link>
										<button
											onClick={handleRemove}
											className=' btn btn-outline-dark'
										>
											Delete post
										</button>
									</>
								)}
						</div>
					</div>
				}
				{isAuthenticated()?.user && (
					<Comment
						setRun={setRun}
						run={run}
						postId={post._id}
						comments={comments}
					/>
				)}
			</div>
			<ToastContainer
				position='top-right'
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</Layout>
	);
};

export default SinglePost;
