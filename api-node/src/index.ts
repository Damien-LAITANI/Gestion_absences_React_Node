import express from 'express';
import router from './routes/routes';

const app = express();
const port = 3000;
app.use(router);

app.listen(port, () => {
	console.clear();
	console.log(`
\t\t\t\t********************************************
\t\t\t\t*                                          *
\t\t\t\t*      API Node : listen on port ${port}      *
\t\t\t\t*                                          *
\t\t\t\t********************************************
`);
});
