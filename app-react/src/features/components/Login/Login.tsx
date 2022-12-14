const Login = () => {
	return (
		<>
			<img src="" alt="logo" />
			<h1>Respire</h1>
			<h2>Gestion des absences</h2>
			<form>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input
						type="email"
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
