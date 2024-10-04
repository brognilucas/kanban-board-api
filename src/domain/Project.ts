import { randomUUID } from "crypto";
import Stage from "./Stage";

export default class Project { 
  name: string;
  id: string;
  stages?: Stage[];

  constructor(id: string, name: string, stages: Stage[] = []) {
    this.id = id;
    this.name = name;
    this.stages = stages;
  }

  addStage(name: string) { 
    const stage = Stage.build(name, this.stages!.length + 1, this.id);
    this.stages?.push(stage);
    return stage;
  }

  getStage(stageId: string): Stage | undefined { 
    return this.stages?.find((stage) => stage.id === stageId);
  }

  static getDefaultStages() { 
    return ['TODO', 'IN PROGRESS', 'COMPLETED' , 'ARCHIVED']
  }

  static build(name: string) { 
    const id = randomUUID(); 
    const project = new Project(id, name);

    for (const stage of Project.getDefaultStages()) { 
      project.addStage(stage);
    }

    return project;
  }
}