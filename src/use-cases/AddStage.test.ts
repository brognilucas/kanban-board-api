
import AddStage from './AddStage';
import Project from '../domain/Project';
import FakeProjectRepository from '../repository/implementation/FakeProjectRepository';
import ProjectService from '../services/interfaces/Project';
import ProjectServiceImpl from '../services/implementation/ProjectService';
import CreateProject from './CreateProject';

describe('AddStage Use Case', () => {
  let fakeProjectRepository: FakeProjectRepository;
  let projectService: ProjectService;
  let addStageUseCase: AddStage;
  let createProject: CreateProject;

  beforeEach(() => {
    fakeProjectRepository = new FakeProjectRepository();
    projectService = new ProjectServiceImpl(fakeProjectRepository)
    addStageUseCase = new AddStage(projectService);
    createProject = new CreateProject(projectService);
  });

  it('should add a new stage to an existing project', async () => {
    const name = 'Test'
    const { id: projectId } = await createProject.execute({ name });

    const input = {
      projectId,
      name: 'NEW STAGE'
    };

    const updatedProject = await addStageUseCase.execute(input);
    expect(updatedProject.stages).toHaveLength(5);
    expect(updatedProject.stages![4].name).toBe('NEW STAGE');
  });

  it('should throw an error if the project does not exist', async () => {
    const input = {
      projectId: 'non-existent-id',
      name: 'NEW STAGE'
    };

    await expect(addStageUseCase.execute(input)).rejects.toThrow('Project not found');
  });
});
