import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from "react-redux";
import "./bootstrap/bootstrap.min.css";
import store from "./store";
import { ChakraProvider, theme } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<GoogleOAuthProvider clientId="737908247414-mm0vbr50qdjtrnikbl0o3h1so8obtin6.apps.googleusercontent.com">
	<Provider store={store}>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</Provider>
	</GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
