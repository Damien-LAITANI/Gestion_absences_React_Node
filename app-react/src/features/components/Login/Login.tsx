import { login } from '../../../services/connectService';
import { useNavigate } from 'react-router-dom';

interface ILogin {
	setUser: Function;
}

const Login = ({ setUser }: ILogin) => {
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
			setUser(response.data);
			navigate('/');
		}
		console.log(response);
	};

	return (
		<>
			<img src="" alt="logo" />
			<h1>Respire</h1>
			<h2>Gestion des absences</h2>
			<form onSubmit={handleConnection}>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input
						type="text"
						name="email"
						className="form-control"
						id="email"
						aria-describedby="emailHelp"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Mot de passe
					</label>
					<input
						type="password"
						name="password"
						className="form-control"
						id="password"
					/>
				</div>
				<button type="submit" className="btn btn-success">
					Se connecter
				</button>
			</form>
		</>
	);
};

export default Login;
