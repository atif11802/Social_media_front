import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";

function PrivateRoute({ children }) {
	const auth = isAuthenticated()?.token;
	return auth ? children : <Navigate to='/signin' />;
}

export default PrivateRoute;
