import instance from "../axios";

export const create = (post) => {
	// console.log(post);
	const { body, title, postedBy } = post;
	return instance
		.post("/post", { body, title, postedBy })
		.then((res) => {
			console.log(res.data.msg);

			return res;
		})
		.catch(function (error) {
			return error.response.data;
		});
};

export const getPost = () => {
	return instance
		.get("/posts")
		.then((res) => {
			console.log(res.data.msg);

			return res;
		})
		.catch(function (error) {
			return error.response.data;
		});
};

export const singlePost = (postId) => {
	return instance
		.get(`/post/${postId}`)
		.then((res) => {
			// console.log(res.data.msg);

			return res;
		})
		.catch(function (error) {
			return error.response.data;
		});
};

export const getPostsById = (userId) => {
	return instance
		.get(`/posts/by/${userId}`)
		.then((res) => {
			console.log(res.data.msg);

			return res;
		})
		.catch(function (error) {
			return error.response.data;
		});
};

export const removePost = (postId) => {
	return instance
		.delete(`/post/${postId}`)
		.then((res) => {
			console.log(res.data.msg);

			return res;
		})
		.catch(function (error) {
			return error.response.data;
		});
};

export const updatePost = (postId, { title, body }) => {
	return instance
		.put(`/post/${postId}`, {
			title,
			body,
		})
		.then((res) => {
			return res;
		})
		.catch(function (error) {
			return error.response.data;
		});
};

export const likePost = (userId, postId) => {
	return instance
		.put(`/post/like`, {
			userId,
			postId,
		})
		.then((res) => {
			return res;
		})
		.catch(function (error) {
			return error.response.data;
		});
};

export const unlikePost = (userId, postId) => {
	return instance
		.put(`/post/unlike`, {
			userId,
			postId,
		})
		.then((res) => {
			return res;
		})
		.catch(function (error) {
			return error.response.data;
		});
};

export const commentPost = (userId, postId, comment) => {
	return instance
		.put(`/post/comment`, {
			userId,
			postId,
			comment,
		})
		.then((res) => {
			return res;
		})
		.catch(function (error) {
			return error.response.data;
		});
};

export const uncommentPost = (userId, postId, comment) => {
	return instance
		.put(`/post/uncomment`, {
			userId,
			postId,
			comment,
		})
		.then((res) => {
			return res;
		})
		.catch(function (error) {
			return error.response.data;
		});
};

export const sharePost = (shared, userId) => {
	return instance
		.put(`/users/share`, {
			shared,
			userId,
		})
		.then((res) => {
			return res;
		})
		.catch(function (error) {
			return error.response.data;
		});
};
