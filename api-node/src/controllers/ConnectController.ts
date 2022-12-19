import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { connect } from 'mongoose';
import { IUser } from '../models/User/IUser';
import User from '../models/User/User';
import jwt from 'jsonwebtoken';

export const dbURI = 'mongodb://127.0.0.1:27017/absenceApp';

connect(dbURI);

export const login = (req: Request, res: Response) => {
	const { email, password } = req.body;
	User.findOne({ email: email }, async (error: any, user: IUser) => {
		if (!user)
			res.status(404).json({
				message: "L'email ou le mot de passe ne correspond pas",
			});

		// const ViewPass = await bcrypt.hash(password, 12);
		// console.log(ViewPass);

		const isValidPass: boolean = await bcrypt.compare(
			password,
			user.password!
		);

		if (!isValidPass)
			return res.status(404).json({
				message: "L'email ou le mot de passe ne correspond pas",
			});

		const token = jwt.sign(
			{ id: user._id },
			'832afcf0-7a23-11ed-9825-4b3929766098',
			{ expiresIn: '1d' }
		);
		// const optionsCookie = {
		// 	secure: true,
		// 	// httpOnly: true,
		// };

		// res.cookie('token', token, optionsCookie);
		user.password = '';

		res.status(200).json({
			token: jwt.sign(
				{ id: user._id },
				'832afcf0-7a23-11ed-9825-4b3929766098',
				{ expiresIn: '1d' }
			),
			user,
		});
	});
};
