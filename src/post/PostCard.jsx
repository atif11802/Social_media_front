import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
	function truncateString(str, num) {
		if (str.length > num) {
			return str.slice(0, num) + "...";
		} else {
			return str;
		}
	}

	return (
		<div
			className='card'
			style={{ width: "18rem", marginBottom: "10px", marginRight: "10px" }}
		>
			<img
				src='https://images.pexels.com/photos/8474523/pexels-photo-8474523.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
				className='card-img-top'
				alt='...'
			/>
			<div className='card-body'>
				<h5 className='card-title'>{post.title}</h5>
				<p className='card-text'>{truncateString(post.body, 20)}</p>
				<br />
				<p className='font-italic mark'>
					Posted by{" "}
					<Link to={`/user/${post?.postedBy?._id}`}>
						{post?.postedBy?.name}
					</Link>
				</p>
				<Link to={`/post/${post._id}`} className='btn btn-primary'>
					Read More
				</Link>
			</div>
		</div>
	);
};

export default PostCard;
