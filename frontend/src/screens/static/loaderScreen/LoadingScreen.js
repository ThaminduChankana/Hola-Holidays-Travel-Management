import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./LoadingScreen.css";
import MainScreen from "../../../components/MainScreen";
import axios from "axios";
import { AUTH_ENDPOINT } from "../../../config";

const LoadingScreen = () => {
	const history = useHistory();

	useEffect(() => {

		const timeout = setTimeout(() => {
			history.push("/");
		}, 10000);

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
