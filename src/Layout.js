import React from "react";
import Menu from "./core/Menu";

const Layout = ({ children }) => {
	return (
		<div>
			<Menu />
			<div className=''>{children}</div>
		</div>
	);
};

export default Layout;
