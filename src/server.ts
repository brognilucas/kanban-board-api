import express, { Request, Response } from 'express';
import cors from 'cors';
import { projectRoutes } from './routes/project.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', projectRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
