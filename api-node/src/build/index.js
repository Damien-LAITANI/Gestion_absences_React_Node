import express from 'express';
import router from './routes/routes.js';
import { script } from './scripts/script.js';
import schedule from 'node-schedule';
import * as dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.NODE_ENV === 'production' ? 443 : 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', `${process.env.FRONT_DOMAINE}`);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	next();
});
app.use(router);

app.listen(port, () => {
	schedule.scheduleJob('* * 0 * *', script);
});
