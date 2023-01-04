import { connect } from 'mongoose';
import User from '../models/User/User.js';
import { dbURI } from './ConnectController.js';
import jwt from 'jsonwebtoken';
import { authorization } from '../auth/auth.js';
connect(dbURI);
export const getAllUser = (req, res) => {
	User.find({}, (error, users) => {
		res.status(200).json(users);
	});
};
export const getAllEmployee = (req, res) => {
	var _a;
	console.log(req.headers.authorization);
	// Récupération du token
	const token =
		(_a = req.headers.authorization) === null || _a === void 0
			? void 0
			: _a.split(' ')[1];
	// Controle de la présence et la validité du token
	const verifiedToken = authorization(token);
	if (verifiedToken === undefined)
		return res.status(401).json({ message: 'Veuillez vous connecter' });
	if (!verifiedToken)
		return res.status(403).json({ message: 'Action non autorisée' });
	// Si le token est bon on renvoie les employés
	const { idManager } = req.params;
	User.find({ superior: idManager }, (error, users) => {
		res.status(200).json(users);
	});
};
/**
 * Fonction qui retourne l'user en fonction d'un id donné en params de la requete ou dans le token
 * @param req
 * @param res
 * @returns renvoie l'user
 */
export const getUser = (req, res) => {
	var _a;
	console.log(req.headers.authorization);
	const { id: idParams } = req.params;
	if (idParams) {
		User.findById(idParams, (error, user) => {
			res.status(200).json(user);
		});
	} else if (req.headers.authorization) {
		// Récupération du token
		const token =
			(_a = req.headers.authorization) === null || _a === void 0
				? void 0
				: _a.split(' ')[1];
		// Controle de la présence et la validité du token
		const verifiedToken = authorization(token);
		if (verifiedToken === undefined)
			return res.status(401).json({ message: 'Veuillez vous connecter' });
		if (!verifiedToken)
			return res.status(403).json({ message: 'Action non autorisée' });
		// On décode le token pour pouvoir utiliser l'id qui se trouve à l'intérieur
		const decoded = jwt.decode(token, { json: true });
		if (decoded) {
			User.findById(decoded.id, (error, user) => {
				res.status(200).json(user);
			});
		} else {
			res.status(404).json({ message: 'erreur de connexion !!!' });
		}
	} else {
		res.status(404).json({ message: 'erreur de connexion !!!' });
	}
};
export const addUser = (req, res) => {
	var _a;
	// Récupération du token
	const token =
		(_a = req.headers.authorization) === null || _a === void 0
			? void 0
			: _a.split(' ')[1];
	// Controle de la présence et la validité du token
	const verifiedToken = authorization(token);
	if (verifiedToken === undefined)
		return res.status(401).json({ message: 'Veuillez vous connecter' });
	if (!verifiedToken)
		return res.status(403).json({ message: 'Action non autorisée' });
	User.create(req.body, (error, user) => {
		if (error) res.status(404).json({ message: 'Erreur' });
		// si pas d'erreur on retourne l'user créé
		res.status(201).json(user);
	});
};
export const updateUser = (req, res) => {
	var _a;
	const updatedUser = req.body;
	// Récupération du token
	const token =
		(_a = req.headers.authorization) === null || _a === void 0
			? void 0
			: _a.split(' ')[1];
	// Controle de la présence et la validité du token
	const verifiedToken = authorization(token);
	if (verifiedToken === undefined)
		return res.status(401).json({ message: 'Veuillez vous connecter' });
	if (!verifiedToken)
		return res.status(403).json({ message: 'Action non autorisée' });
	User.replaceOne({ _id: req.body._id }, updatedUser, (error, user) => {
		res.status(200).json(user);
	});
};
export const deleteUser = (req, res) => {
	var _a;
	const { id } = req.params;
	// Récupération du token
	const token =
		(_a = req.headers.authorization) === null || _a === void 0
			? void 0
			: _a.split(' ')[1];
	// Controle de la présence et la validité du token
	const verifiedToken = authorization(token);
	if (verifiedToken === undefined)
		return res.status(401).json({ message: 'Veuillez vous connecter' });
	if (!verifiedToken)
		return res.status(403).json({ message: 'Action non autorisée' });
	User.deleteOne({ _id: id }, (error, user) => {
		res.status(200).json(user);
	});
};
