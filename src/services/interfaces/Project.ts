import Project from "../../domain/Project";
import Stage from "../../domain/Stage";

export default interface ProjectService { 
  create(project: Project): Promise<string>; 
  getAll(): Promise<Project[]>
  getById(proectId: string): Promise<Project | null>
  addStage(project: Project, stage: Stage): Promise<Project>
}
