import { login } from '../../../services/ConnectService/connectService';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import './Login.scss';
import { useState } from 'react';
import Cookies from 'js-cookie';

interface ILogin {
	setUser: Function;
	setUserToken: Function;
	setIsManager: Function;
}

const Login = ({ setUser, setUserToken, setIsManager }: ILogin) => {
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const handleConnection = async (event: any) => {
		event.preventDefault();
		const [email, password] = event.target;
		const emailValue = email.value;
		const passwordValue = password.value;

		const response = await login({
			email: emailValue,
			password: passwordValue,
		});
		if (response.status === 200) {
			setUser(response.data.user);

			const optionsCookie = {
				secure: true,
				expires: 1,
			};

			if (Cookies.set('Token', response.data.token, optionsCookie)) {
				setUserToken(Cookies.get('Token'));
				setIsManager(
					response.data.user.roles.includes('manager') ||
						response.data.user.roles.includes('admin')
				);
				navigate('/');
			}
		}
		console.log(response);
	};

	const handleDisplayPass = (event: any) => {
		const inputPassword: Element | null =
			document.querySelector('#password');

		setShowPassword(!showPassword);
		if (!showPassword) {
			return inputPassword?.setAttribute('type', 'text');
		}
		inputPassword?.setAttribute('type', 'password');
	};

	return (
		<div className="container__login w-50 mx-auto d-flex flex-column align-items-center">
			<img src="favicon.png" alt="logo" />
			<h1 className="app__name">Respire</h1>
			<h2 className="app__sub">Gestion des absences</h2>
			<form onSubmit={handleConnection}>
				<div className="form-floating mb-3">
					<input
						type="text"
						name="email"
						className="form-control"
						id="email"
						aria-describedby="emailHelp"
						placeholder="Email"
					/>
					<label htmlFor="email">Email</label>
				</div>
				<div className="form-floating mb-3 d-flex justify-content-between align-items-center">
					<input
						type="password"
						name="password"
						className="form-control"
						placeholder="Password"
						id="password"
					/>
					<label htmlFor="password">Mot de passe</label>
					{showPassword ? (
						<svg
							onClick={handleDisplayPass}
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							fill="currentColor"
							className="showPass bi bi-eye-slash-fill"
							viewBox="0 0 16 16"
						>
							<path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
							<path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
						</svg>
					) : (
						<svg
							onClick={handleDisplayPass}
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							fill="currentColor"
							className="showPass bi bi-eye-fill"
							viewBox="0 0 16 16"
						>
							<path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
							<path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
						</svg>
					)}
				</div>
				<button type="submit" className="btn btn-success">
					Se connecter
				</button>
			</form>
		</div>
	);
};

export default Login;
