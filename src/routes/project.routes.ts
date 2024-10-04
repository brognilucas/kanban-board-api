import express, { Request, Response } from 'express';
import CreateProject from '../use-cases/CreateProject';
import ProjectService from '../services/implementation/ProjectService';
import { PrismaProjectRepository } from '../repository/implementation/PrismaProjectRepository';
import GetProject from '../use-cases/GetProject';
import AddStage from '../use-cases/AddStage';
import CreateCase from '../use-cases/CreateCase';
import CaseService from '../services/implementation/CaseService';
import { PrismaCaseRepository } from '../repository/implementation/PrismaCaseRepository';
import ChangeStageOfCase from '../use-cases/ChangeStageOfCase';

const router = express.Router();

const projectRepository = new PrismaProjectRepository();
const caseRepository = new PrismaCaseRepository();

const projectService = new ProjectService(projectRepository);
const caseService = new CaseService(caseRepository);

const createProjectUseCase = new CreateProject(projectService);
const getProjectsUseCase = new GetProject(projectService);
const addStageUseCase = new AddStage(projectService);
const createCase = new CreateCase(projectService, caseService);
const changeStageOfCase = new ChangeStageOfCase(projectService, caseService);

router.get('/projects', async (_req: Request, res: Response, next) => {
  const projects = await getProjectsUseCase.execute();
  res.status(200).json(projects);
  next()
});

router.post('/projects', async (req: Request, res: Response, next) => {
  const response = await createProjectUseCase.execute({ name: req.body.name });
  res.status(201).json(response);
  next();
})

router.post('/projects/:projectId/stages', async (req: Request, res: Response, next) => {
  const response = await addStageUseCase.execute({ name: req.body.name, projectId: req.params.projectId });
  res.status(201).json(response);
  next();
});

router.post('/projects/:projectId/stages/:stageId/cases', async (req: Request, res: Response, next) => {
  const response = await createCase.execute({
    name: req.body.name,
    description: req.body.description,
    stageId: req.params.stageId, 
    projectId: req.params.projectId,
  });
  res.status(201).json(response);
  next();
})

router.put('/projects/:projectId/cases/:caseId/move', async (req: Request, res: Response, next) => {
  await changeStageOfCase.execute({
    stageId: req.body.stageId, 
    caseId: req.params.caseId,
    projectId: req.params.projectId
  });
  res.status(204).end();
  next();
})


export { router as projectRoutes };
