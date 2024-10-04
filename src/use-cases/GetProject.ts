import ProjectService from "../services/interfaces/Project";

export default class GetProject { 
  constructor(private projectService: ProjectService) { }

  async execute() { 
    const response = this.projectService.getAll();
    return response;
  }
}