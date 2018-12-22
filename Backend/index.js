import 'babel-polyfill';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import webConfig from './webConfig.json';
import logging from './startup/logging';
import routes from './startup/routes';
import db from './startup/db';
import config from './startup/config';
import prod from './startup/prod';

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  credentials: true,
  origin: webConfig.frontend_url,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(cookieParser())
/*Initialize app start-up functions*/
logging();
routes(app);
db();
config();
prod(app);

let server = app.listen(PORT, () => console.log(`Running on port ${PORT}`));

export default server;
