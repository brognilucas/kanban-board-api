import CreateProject from './CreateProject';
import ProjectService from '../services/implementation/ProjectService';
import Project from '../domain/Project';
import FakeProjectRepository from '../repository/implementation/FakeProjectRepository';
import GetProject from './GetProject';

describe('GetProject Use Case', () => {
  let fakeProjectRepository: FakeProjectRepository;
  let projectService: ProjectService;
  let createProjectUseCase: CreateProject;
  let getProjectUseCase: GetProject;

  beforeEach(() => {
    fakeProjectRepository = new FakeProjectRepository();
    projectService = new ProjectService(fakeProjectRepository);
    createProjectUseCase = new CreateProject(projectService);
    getProjectUseCase = new GetProject(projectService);
  });

  it('should get all projects', async () => {
    const projectName = 'Test Project';
    await createProjectUseCase.execute({ name: projectName });

    const allProjects = await getProjectUseCase.execute()
    expect(allProjects).toHaveLength(1);
    expect(allProjects[0].name).toBe(projectName);
  });
});
