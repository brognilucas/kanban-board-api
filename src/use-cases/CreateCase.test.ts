import CreateProject from './CreateProject';
import ProjectService from '../services/implementation/ProjectService';
import FakeProjectRepository from '../repository/implementation/FakeProjectRepository';
import GetProject from './GetProject';
import Stage from '../domain/Stage';
import CreateCase from './CreateCase';
import CaseService from '../services/implementation/CaseService';
import CaseRepository from '../repository/interfaces/CaseRepository';
import FakeCaseRepository from '../repository/implementation/FakeCaseRepository';

describe('CreateCase Use Case', () => {
  let fakeProjectRepository: FakeProjectRepository;
  let projectService: ProjectService;
  let createProjectUseCase: CreateProject;
  let getProjectUseCase: GetProject;
  let createCaseUseCase: CreateCase;
  let caseService: CaseService;
  let caseRepository: CaseRepository;

  let projectId = '';
  let stages: Stage[] = []
  beforeEach(async () => {
    fakeProjectRepository = new FakeProjectRepository();
    projectService = new ProjectService(fakeProjectRepository);
    createProjectUseCase = new CreateProject(projectService);
    getProjectUseCase = new GetProject(projectService);
    caseRepository = new FakeCaseRepository();
    caseService = new CaseService(caseRepository);
    createCaseUseCase = new CreateCase(projectService, caseService);

    const response = await createProjectUseCase.execute({ name: 'Test project' });
    projectId = response.id;

    const projects = await projectService.getById(projectId)
    stages = projects?.stages!;
  });

  it('should be able to create a case', async () => {
    const [stage] = stages;

    const output = await createCaseUseCase.execute({
      stageId: stage.id,
      projectId,
      name: "test",
      description: "test description",
    })

    expect(output.id).toBeDefined();

    const caseOutput = await caseRepository.getById(output.id);
    expect(caseOutput?.name).toEqual('test');
    expect(caseOutput?.description).toEqual('test description');
  })

  it('should throw if project does not exits', async () => {
    const [stage] = stages;

    await expect(() => createCaseUseCase.execute({
      stageId: stage.id,
      projectId: 'fake-uuid',
      name: "test",
      description: "test description",
    })).rejects.toThrow('Project does not exists')
  })

  it('should throw if stage is not part of project' , async () => { 

    await expect(() => createCaseUseCase.execute({
      stageId: 'fake-uuid',
      projectId,
      name: "test",
      description: "test description",
    })).rejects.toThrow(`Stage does not exists on project ${projectId}`)
  })
})