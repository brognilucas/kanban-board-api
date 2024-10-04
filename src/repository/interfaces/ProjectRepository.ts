import Project from "../../domain/Project";
import Stage from "../../domain/Stage";

export default interface ProjectRepository {
  create(input: Project): Promise<Project>; 
  findById(id: string): Promise<Project | null>;
  findAll(): Promise<Project[]>;
  addStage(input: Project, stage: Stage): Promise<Project>
}
