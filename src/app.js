import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import CalculateCommissionForInputData from './services/calculate-commission-for-input-data';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const filePath = process.argv.slice(2)[0];
const calculateCommissionForInputData = new CalculateCommissionForInputData(filePath);
calculateCommissionForInputData.run();

export default app;
