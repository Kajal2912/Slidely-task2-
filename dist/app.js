import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import submissionRoutes from './routes/submission.js';
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', submissionRoutes);
export default app;
