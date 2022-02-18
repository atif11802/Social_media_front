import instance from "../axios";

export const Signin = (user) => {
	return instance
		.post("/signin", user)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};

export const Signup = (user) => {
	return instance
		.post("/signup", user)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};

export const logout = () => {
	return instance
		.post("/signout")
		.then((res) => {
			console.log(res.data.msg);

			return res;
		})
		.catch(function (error) {
			return error.response.data;
		});
};

export const isAuthenticated = () => {
	if (typeof window !== "undefined") {
		if (localStorage.getItem("token")) {
			return JSON.parse(localStorage.getItem("token"));
		}
	}
	return false;
};

export const getUserDetails = (userId) => {
	return instance
		.get(`/user/${userId}`)
		.then((res) => {
			return res;
		})
		.catch((error) => {
			return error;
		});
};

export const listUser = () => {
	return instance
		.get(`/users`)
		.then((res) => {
			return res;
		})
		.catch(function (error) {
			return error.response.data;
		});
};

export const deleteAccount = (userId) => {
	return instance
		.delete(`/user/${userId}`)
		.then((res) => {
			return res;
		})
		.catch(function (error) {
			return error.response.data;
		});
};

export const updateUser = (userId, user) => {
	return instance
		.put(`/user/${userId}`, user)
		.then((res) => {
			return res;
		})
		.catch(function (error) {
			return error.response.data;
		});
};

export const callApi = (userId, followId) => {
	// console.log("API call", userId, followId);
	return instance
		.put("users/follow", JSON.stringify({ userId, followId }))
		.then((res) => {
			return res;
		})
		.catch(function (error) {
			return error.response.data;
		});
};

export const unFollow = (userId, unfollowId) => {
	// console.log("API call", userId, followId);
	return instance
		.put("users/unfollow", JSON.stringify({ userId, unfollowId }))
		.then((res) => {
			return res;
		})
		.catch(function (error) {
			return error.response.data;
		});
};

export const findPeople = (userId) => {
	return instance
		.get(`/user/findPeople/${userId}`)
		.then((res) => {
			return res;
		})
		.catch(function (error) {
			return error.response.data;
		});
};
