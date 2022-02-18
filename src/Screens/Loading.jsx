import React from "react";
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";

const override = css`
	display: block;
	justify-content: center;
	margin: 0 auto;

	border-color: red;
	color: "#333333";
`;

const Loading = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				marginTop: "20px",
				marginBottom: "20px",
			}}
		>
			<SyncLoader css={override} size={15} />
		</div>
	);
};

export default Loading;
