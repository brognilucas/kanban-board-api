import Project from '../../domain/Project';
import Stage from '../../domain/Stage';
import ProjectRepository from '../../repository/interfaces/ProjectRepository';
import IProjectService from '../interfaces/Project';

export default class ProjectService implements IProjectService {
  constructor(private projectRepository: ProjectRepository){}

  async create(input: Project): Promise<string> {
    const project = await this.projectRepository.create(input)
    return project.id;
  } 

  async getAll(): Promise<Project[]> {
    const response = await this.projectRepository.findAll();
    return response;
  }

  async getById(id: string): Promise<Project | null> { 
    return this.projectRepository.findById(id);
  }

  async addStage(project: Project, stage: Stage) { 
    await this.projectRepository.addStage(project, stage)
    return project;
  }
}