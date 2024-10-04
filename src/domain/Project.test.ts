import Project from './Project';
import Stage from './Stage'; // Import the Stage class if you have it defined

describe('Project', () => {
  let project: Project;

  beforeEach(() => {
    project = new Project('test-id', 'Test Project');
  });

  it('should create a project with the correct name and ID', () => {
    expect(project.name).toBe('Test Project');
    expect(project.id).toBe('test-id');
    expect(project.stages).toEqual([]);
  });

  it('should add a stage to the project', () => {
    project.addStage('TODO');
    expect(project.stages).toHaveLength(1);
    expect(project.stages![0].name).toBe('TODO');
  });

  it('should add multiple stages to the project', () => {
    project.addStage('TODO');
    project.addStage('IN PROGRESS');
    expect(project.stages).toHaveLength(2);
    expect(project.stages![1].name).toBe('IN PROGRESS');
  });

  it('should initialize with default stages when built', () => {
    const builtProject = Project.build('New Project');
    expect(builtProject.stages).toHaveLength(4);
    expect(builtProject.stages![0].name).toBe('TODO');
    expect(builtProject.stages![1].name).toBe('IN PROGRESS');
    expect(builtProject.stages![2].name).toBe('COMPLETED');
    expect(builtProject.stages![3].name).toBe('ARCHIVED');
  });

  it('should have a unique ID when built', () => {
    const project1 = Project.build('Project 1');
    const project2 = Project.build('Project 2');

    expect(project1.id).not.toBe(project2.id);
  });

  it('should generate stages with the correct sequence number', () => {
    const builtProject = Project.build('New Project');
    expect(builtProject.stages![0].sequence).toBe(1);
    expect(builtProject.stages![1].sequence).toBe(2);
    expect(builtProject.stages![2].sequence).toBe(3);
    expect(builtProject.stages![3].sequence).toBe(4);
  });
});
