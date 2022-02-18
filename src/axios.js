const axios = require("axios");

const instance = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,

	headers: {
		"Content-Type": "application/json",
		Authorization: localStorage.getItem("token")
			? "Bearer " + JSON.parse(localStorage.getItem("token")).token
			: "",
	},
});

export default instance;
