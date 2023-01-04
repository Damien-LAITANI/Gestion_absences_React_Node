import { connect } from 'mongoose';
import { authorization } from '../auth/auth.js';
import Holiday from '../models/Holiday/Holiday.js';
import { dbURI } from './ConnectController.js';
connect(dbURI);
export const getAllHoliday = (req, res) => {
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
	Holiday.find({}, (error, holidays) => {
		if (error) res.status(404).json({ message: 'Erreur' });
		res.status(200).json(holidays);
	});
};
export const addHoliday = (req, res) => {
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
	Holiday.create(req.body, (error, Holiday) => {
		if (error) res.status(404).json({ message: 'Erreur' });
		res.status(201).json(Holiday);
	});
};
export const updateHoliday = (req, res) => {
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
	Holiday.replaceOne({ _id: req.body._id }, updatedUser, (error, user) => {
		if (error) res.status(404).json({ message: 'Erreur' });
		res.status(200).json(user);
	});
};
export const deleteHoliday = (req, res) => {
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
	Holiday.deleteOne({ _id: id }, (error, user) => {
		if (error) res.status(404).json({ message: 'Erreur' });
		res.status(200).json(user);
	});
};
