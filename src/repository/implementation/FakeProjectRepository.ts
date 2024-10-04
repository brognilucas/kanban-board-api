// src/repository/fakes/FakeProjectRepository.ts

import Project from "../../domain/Project";
import Stage from "../../domain/Stage";
import ProjectRepository from "../interfaces/ProjectRepository";

export default class FakeProjectRepository implements ProjectRepository {
  
  private projects: Project[] = [];

  async create(project: Project): Promise<Project> {
    this.projects.push(project);
    return project;
  }

  async findAll(): Promise<Project[]> {
    return this.projects;
  }

  async findById(id: string): Promise<Project | null> {
    return this.projects.find((project) => project.id === id) ?? null; 
  }

  async addStage(input: Project, _stage: Stage): Promise<Project> {
    const index = this.projects.findIndex((project) => project.id === input.id);
    this.projects[index] = input; 
    return input;
  }
}