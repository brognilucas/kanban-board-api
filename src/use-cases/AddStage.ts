import ProjectService from "../services/interfaces/Project";

export default class AddStage { 

  constructor(private projectService: ProjectService){} 

  async execute(input: Input) {
    const project = await this.projectService.getById(input.projectId);
    if (!project) throw new Error('Project not found');

    const stage = project.addStage(input.name);
    await this.projectService.addStage(project, stage); 

    return project;
  }
}

type Input = {
  projectId: string,
  name: string
}