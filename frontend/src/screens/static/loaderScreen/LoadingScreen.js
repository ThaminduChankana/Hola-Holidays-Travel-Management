import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./LoadingScreen.css";
import MainScreen from "../../../components/MainScreen";

const LoadingScreen = () => {
	const history = useHistory();

	// Make an HTTP request to your server to authenticate the user
	fetch("http://localhost:5001/auth", {
		method: "POST", // Assuming you use POST for authentication
		// Include any required headers and credentials as needed
	})
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error("Authentication failed");
			}
		})
		.then((data) => {
			localStorage.setItem("customerInfo", JSON.stringify(data));
			console.log(data);
		})
		.catch((error) => {
			console.error("Authentication error:", error);
		});

	useEffect(() => {
		const timeout = setTimeout(() => {
			history.push("/");
		}, 1000);

		return () => clearTimeout(timeout);
	}, [history]);

	return (
		<div style={{ background: "black" }}>
			<MainScreen>
				<div className="loading-screen">
					<div className="loader"></div>
				</div>
			</MainScreen>
		</div>
	);
};

export default LoadingScreen;
