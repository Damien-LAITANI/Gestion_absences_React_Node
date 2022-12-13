import express from 'express';
import router from './routes/routes';

const app = express();
const port = 3000;
app.use(router);

app.listen(port, () => {
	console.log(`Connected at port ${port}`);
});
