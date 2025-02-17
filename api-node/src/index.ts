import express, { urlencoded } from 'express';
import router from './routes/routes';
import { script } from './scripts/script';
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
console.log('test');

app.listen(port, () => {
	console.clear();
	console.log(`
\t\t\t\t********************************************
\t\t\t\t*                                          *
\t\t\t\t*      API Node : listen on port ${port}      *
\t\t\t\t*                                          *
\t\t\t\t********************************************
`);
	schedule.scheduleJob('* * 0 * *', script);
});
