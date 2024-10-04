import Case from "../domain/Case";
import { CreationOutput } from "../helpers/types";
import CaseService from "../services/interfaces/Case";
import ProjectService from "../services/interfaces/Project";

export default class CreateCase {
  constructor(private projectService: ProjectService, private caseService: CaseService) { }

  async execute(input: Input): Promise<CreationOutput> {
    const project = await this.projectService.getById(input.projectId);
    if (!project) {
      throw new Error('Project does not exists');
    }

    const stage = project?.getStage(input.stageId);

    if (!stage) {
      throw new Error(`Stage does not exists on project ${input.projectId}`);
    }

    const createdCase = stage.addCase(input.name, input.description)

    await this.caseService.create(createdCase);
    
    return {
      id: createdCase.id
    };
  }
}

type Input = {
  name: string;
  description: string;
  projectId: string;
  stageId: string;
}