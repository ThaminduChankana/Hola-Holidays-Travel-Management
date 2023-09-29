import { Button, Card, Col, Row } from "react-bootstrap";
import "./loginsignup.css";
import MainScreen from "../../../components/MainScreen";
import { Link } from "react-router-dom";

const LoginSignUpScreen = ({ history }) => {
	return (
		<div className="loginsignupBackground">
			<MainScreen title={`Choose Action ...`}>
				<br></br>
				<br></br>
				<br></br>
				<div className="loginContainer">
					<Row>
					<Col>
					<Card
						style={{
							borderRadius: 45,
							borderWidth: 2.0,
							marginTop: 20,
							paddingInline: 10,
							background: "rgba(231, 238, 238, 0.8)",
						}}
					>
						<div className="intro-text">
							<br></br>
							<h1>Customer Login</h1>
							<br></br>
							<Link to="/customer-login">
								<Button id="loginsignupBtn" variant="info" size="lg" style={{ width: 350, height: 75 }}>
									Login
								</Button>
							</Link>
							<br></br>
							<br></br>
							<Link to="/customer-register">
								<Button id="loginsignupBtn" variant="info" size="lg" style={{ width: 350, height: 75 }}>
									Register
								</Button>
							</Link>
							<br></br>
							<br></br>
						</div>
						<br></br>
					</Card>
					</Col>
					<Col>
					
					<Card
						style={{
							borderRadius: 45,
							borderWidth: 2.0,
							marginTop: 20,
							paddingInline: 10,
							background: "rgba(231, 238, 238, 0.8)",
						}}
					>
						<div className="intro-text">
							<br></br>
							<h1>Admin Login</h1>
							<br></br>
							<Link to="/admin-login">
								<Button id="loginsignupBtn" variant="info" size="lg" style={{ width: 350, height: 75 }}>
									Login
								</Button>
							</Link>
							<br></br>
							<br></br>
							<Link to="/admin-register">
								<Button id="loginsignupBtn" variant="info" size="lg" style={{ width: 350, height: 75 }}>
									Register
								</Button>
							</Link>
							<br></br>
							<br></br>
						</div>
						<br></br>
					</Card>
					</Col>
					</Row>
				</div>
			</MainScreen>
		</div>
	);
};

export default LoginSignUpScreen;
