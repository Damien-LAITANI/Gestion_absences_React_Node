var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step(
				(generator = generator.apply(thisArg, _arguments || [])).next()
			);
		});
	};
import bcrypt from 'bcrypt';
import { connect } from 'mongoose';
import User from '../models/User/User.js';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
export const dbURI = 'mongodb://127.0.0.1:27017/absenceApp';
// export const dbURI = 'mongodb://localhost:27017/absenceApp';
connect(dbURI);
export const login = (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email: email }, (error, user) =>
		__awaiter(void 0, void 0, void 0, function* () {
			if (!user)
				return res.status(404).json({
					message: "L'email ou le mot de passe ne correspond pas",
				});
			const isValidPass = yield bcrypt.compare(password, user.password);
			if (!isValidPass)
				return res.status(404).json({
					message: "L'email ou le mot de passe ne correspond pas",
				});
			const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
				expiresIn: '1h',
			});
			res.status(200).json({
				token: token,
				user,
			});
		})
	);
};
