import CaseService from "../services/interfaces/Case";
import ProjectService from "../services/interfaces/Project";

export default class ChangeStageOfCase { 

  constructor(private projectService: ProjectService, private caseService: CaseService) { 
  }

  async execute(input: Input) { 
    const existingCase = await this.caseService.getById(input.caseId);
    if (!existingCase) { 
      throw new Error(`Case ${input.caseId} does not exists`);
    }
    const project = await this.projectService.getById(input.projectId);
    const previousStage = project?.getStage(existingCase?.stageId!); 
    if (!previousStage) { 
      throw new Error(`Current stage is not part of project ${input.projectId}`)
    }
    const newStage = project?.getStage(input.stageId)
    if (!newStage) { 
      throw new Error(`New stage is not part of same project as previous stage`)
    }

    await this.caseService.updateStage(input.caseId, input.stageId, newStage.getNextCaseOrder());
  }
}

type Input = { 
  stageId: string;
  projectId: string;
  caseId: string;
}