import Project from "../domain/Project";
import { CreationOutput } from "../helpers/types";
import ProjectService from "../services/interfaces/Project";

export default class CreateProject { 
  constructor(private service: ProjectService){}

  async execute(input: Input): Promise<CreationOutput> { 
    const id = await this.service.create(Project.build(input.name));
    return {
      id,
    }
  } 
}

type Input = { 
  name: string;
}