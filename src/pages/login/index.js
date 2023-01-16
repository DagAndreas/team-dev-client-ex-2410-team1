import { useState } from "react";
import Button from "../../components/button";
import TextInput from "../../components/form/textInput";
import useAuth from "../../hooks/useAuth";
import FullLogo from "../../assets/fullLogo";
import "./login.css";

const Login = () => {
	const { onLogin } = useAuth();
	const [formData, setFormData] = useState({ email: "", password: "" });

	const onChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<div className="bg-blue login-wrapper">
			<div className="login mx-auto">
				<div className="login-logo">
					<FullLogo />
				</div>
				<h1 className="login-title h3">Login</h1>
				<div className="login-form">
					<form>
						<TextInput
							value={formData.email}
							onChange={onChange}
							name="email"
							label={"Email *"}
						/>

						<TextInput
							value={formData.password}
							onChange={onChange}
							name="password"
							label={"Password *"}
							type={"password"}
						/>
					</form>
					<Button
						text="Log in"
						onClick={() => onLogin(formData.email, formData.password)}
						classes="bg-green width-full text-blue"
					/>
				</div>
				<div className="sociallinks">
					<p className="sociallinks-title">Or log in with</p>
					<div className="sociallinks-links">
						<SocialLinks />
					</div>
				</div>
				<div className="altbutton">
					<p className="altbutton-title">Need an account?</p>
					<Button text="Sign up" classes="bg-offwhite text-lightblue"></Button>
				</div>
			</div>
		</div>
	);
};

const SocialLinks = () => {
	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 56 56"
				height="56"
			>
				<path
					fill="#3284FF"
					d="M47.19 28c0-1.294-.12-2.558-.34-3.784H28v7.568h11.408c-.74 2.62-2.297 4.86-4.378 6.406l5.886 4.684c3.88-3.66 6.273-8.967 6.273-14.874Z"
				/>
				<path
					fill="#FF3424"
					d="M28.246 16.108c2.868 0 5.451 1.038 7.452 2.767l5.448-5.525C37.744 10.032 33.152 8 28 8c-7.678 0-14.525 4.51-17.857 11.074l6.688 5.099c1.71-4.701 6.253-8.065 11.415-8.065Z"
				/>
				<path
					fill="#FB0"
					d="m10.268 37.167 6.449-5.13a11.968 11.968 0 0 1 .114-7.864l-6.688-5.099a19.661 19.661 0 0 0 .125 18.093Z"
				/>
				<path
					fill="#26B14C"
					d="m16.717 32.037-6.449 5.13C13.645 43.6 20.416 48 28 48c5.036 0 9.539-1.94 12.916-5.126L35.03 38.19a11.294 11.294 0 0 1-6.784 2.242c-5.282 0-9.916-3.522-11.529-8.395Z"
				/>
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 56 56"
				height="56"
			>
				<g clip-path="url(#a)">
					<path
						fill="#2867B2"
						d="M45.333 8H10.89C9.333 8 8 9.333 8 10.889v34C8 46.667 9.333 48 10.889 48H45.11C46.667 48 48 46.667 48 45.111V10.89C48.222 9.333 46.889 8 45.333 8ZM20 42h-6V22.889h6V42Zm-3.111-21.778c-1.778.222-3.333-1.333-3.333-3.333 0-1.778 1.555-3.333 3.333-3.556 1.778 0 3.333 1.556 3.555 3.334 0 2-1.555 3.555-3.555 3.555ZM42 42h-6V31.556c0-3.112-1.333-4-2.889-4-2 0-3.555 1.777-3.555 3.777V42.222h-6V22.89h5.777v2.667c1.111-2 3.334-3.112 5.778-3.112 3.333 0 6.889 2 6.889 7.778V42Z"
					/>
					<path
						fill="#fff"
						d="M14 42h6V22.889h-6v19.11Zm2.889-28.667c-1.778.223-3.333 1.778-3.333 3.556 0 2 1.555 3.555 3.333 3.333 2 0 3.555-1.555 3.555-3.555-.222-1.778-1.777-3.334-3.555-3.334Zm18.222 9.111c-2.444 0-4.667 1.111-5.778 3.111V22.89h-5.777v19.333h6V31.333c0-2 1.555-3.777 3.555-3.777 1.556 0 2.889.888 2.889 4V42h6V30.222c0-5.778-3.556-7.778-6.889-7.778Z"
					/>
				</g>
				<defs>
					<clipPath id="a">
						<path fill="#fff" d="M8 8h40v40H8z" />
					</clipPath>
				</defs>
			</svg>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 56 56"
				height="56"
			>
				<path
					fill="#1877F2"
					d="M48 28c0-11.046-8.954-20-20-20S8 16.954 8 28c0 9.983 7.314 18.257 16.875 19.757V33.78h-5.078V28h5.078v-4.406c0-5.013 2.986-7.782 7.554-7.782 2.188 0 4.477.391 4.477.391v4.922h-2.522c-2.484 0-3.259 1.542-3.259 3.123V28h5.547l-.887 5.781h-4.66v13.976C40.686 46.257 48 37.983 48 28Z"
				/>
				<path
					fill="#fff"
					d="M35.785 33.781 36.672 28h-5.547v-3.752c0-1.581.775-3.123 3.26-3.123h2.521v-4.922s-2.288-.39-4.477-.39c-4.568 0-7.554 2.768-7.554 7.78V28h-5.078v5.781h5.078v13.976c2.07.324 4.18.324 6.25 0V33.78h4.66Z"
				/>
			</svg>
		</>
	);
};

export default Login;
