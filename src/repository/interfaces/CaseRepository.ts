import Case from "../../domain/Case";

export default interface CaseRepository { 
  create(input: Case): Promise<Case>; 
  getById(id: string): Promise<Case | null>
  updateStage(caseId: string, stageId: string, order: number): Promise<void>
}