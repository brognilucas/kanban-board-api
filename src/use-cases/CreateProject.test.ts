import CreateProject from './CreateProject';
import ProjectService from '../services/implementation/ProjectService';
import Project from '../domain/Project';
import FakeProjectRepository from '../repository/implementation/FakeProjectRepository';

describe('CreateProject Use Case', () => {
  let fakeProjectRepository: FakeProjectRepository;
  let projectService: ProjectService;
  let createProjectUseCase: CreateProject;

  beforeEach(() => {
    fakeProjectRepository = new FakeProjectRepository();
    projectService = new ProjectService(fakeProjectRepository);
    createProjectUseCase = new CreateProject(projectService);
  });

  it('should create a new project', async () => {
    const projectName = 'Test Project';
    const project = await createProjectUseCase.execute({ name: projectName });
    expect(project.id).toBeDefined();

    const allProjects = await fakeProjectRepository.findAll();
    expect(allProjects).toHaveLength(1);
    expect(allProjects[0].name).toBe(projectName);
  });
});
