/*
 * @Author: Gauche楽
 * @Date: 2023-03-28 11:46:22
 * @LastEditors: Gauche楽
 * @LastEditTime: 2023-05-05 17:12:55
 * @FilePath: /Gauche-admin-template/src/views/login/index.tsx
 */
import LoginForm from "./components/LoginFrom";
import loginLeft from "@/assets/images/login_left.png";
import logo from "@/assets/images/logo.png";
import "./index.less";

const Login = () => {
	return (
		<div className="login-container">
			<div className="login-box">
				<div className="login-left">
					<img src={loginLeft} alt="login" />
				</div>
				<div className="login-form">
					<div className="login-logo">
						<img className="login-icon" src={logo} alt="logo" />
						<span className="logo-text">Gauche-Admin</span>
					</div>
					<LoginForm />
				</div>
			</div>
		</div>
	);
};

export default Login;
