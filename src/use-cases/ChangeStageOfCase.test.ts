import ChangeStageOfCase from './ChangeStageOfCase';
import ProjectService from '../services/implementation/ProjectService';
import FakeProjectRepository from '../repository/implementation/FakeProjectRepository';
import CaseService from '../services/implementation/CaseService';
import FakeCaseRepository from '../repository/implementation/FakeCaseRepository';
import CreateProject from './CreateProject';
import CreateCase from './CreateCase';
import Stage from '../domain/Stage';

describe('ChangeStageOfCase Use Case', () => {
  let fakeProjectRepository: FakeProjectRepository;
  let projectService: ProjectService;
  let createProjectUseCase: CreateProject;
  let createCaseUseCase: CreateCase;
  let caseService: CaseService;
  let changeStageOfCaseUseCase: ChangeStageOfCase;
  let stages: Stage[] = [];
  let projectId = '';
  let caseId = '';

  beforeEach(async () => {
    fakeProjectRepository = new FakeProjectRepository();
    projectService = new ProjectService(fakeProjectRepository);
    createProjectUseCase = new CreateProject(projectService);
    caseService = new CaseService(new FakeCaseRepository());
    createCaseUseCase = new CreateCase(projectService, caseService);
    changeStageOfCaseUseCase = new ChangeStageOfCase(projectService, caseService);

    const projectResponse = await createProjectUseCase.execute({ name: 'Test project' });
    projectId = projectResponse.id;

    const project = await projectService.getById(projectId);
    stages = project?.stages!;

    const [initialStage] = stages;
    const caseResponse = await createCaseUseCase.execute({
      stageId: initialStage.id,
      projectId,
      name: "Test case",
      description: "Test case description",
    });

    caseId = caseResponse.id;
  });

  it('should change the stage of a case', async () => {
    const [_initialStage, newStage] = stages;

    await changeStageOfCaseUseCase.execute({
      caseId,
      projectId,
      stageId: newStage.id,
    });

    const updatedCase = await caseService.getById(caseId);
    expect(updatedCase?.stageId).toEqual(newStage.id);
  });

  it('should throw if the case does not exist', async () => {
    const [_initialStage, newStage] = stages;

    await expect(() =>
      changeStageOfCaseUseCase.execute({
        caseId: 'fake-uuid',
        projectId,
        stageId: newStage.id,
      })
    ).rejects.toThrow('Case fake-uuid does not exists');
  });

  it('should throw if the current stage is not part of the project', async () => {
    const [_initialStage, newStage] = stages;

    await expect(() =>
      changeStageOfCaseUseCase.execute({
        caseId,
        projectId: 'fake-project-id',
        stageId: newStage.id,
      })
    ).rejects.toThrow(`Current stage is not part of project fake-project-id`);
  });

  it('should throw if the new stage is not part of the same project', async () => {
    const unrelatedProjectResponse = await createProjectUseCase.execute({ name: 'Unrelated Project' });
    const unrelatedProject = await projectService.getById(unrelatedProjectResponse.id);

    const unrelatedStage = unrelatedProject?.stages![0];

    await expect(() =>
      changeStageOfCaseUseCase.execute({
        caseId,
        projectId,
        stageId: unrelatedStage?.id!,
      })
    ).rejects.toThrow('New stage is not part of same project as previous stage');
  });
});
