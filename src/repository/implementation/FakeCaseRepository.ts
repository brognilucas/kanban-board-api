import Case from "../../domain/Case";
import CaseRepository from "../interfaces/CaseRepository";

export default class FakeCaseRepository implements CaseRepository {
  private cases: Case[] = [];

  async create(input: Case): Promise<Case> {
    this.cases.push(input);
    return input;
  }

  async getById(id: string): Promise<Case | null> {
    const foundCase = this.cases.find(c => c.id === id);
    return foundCase ? foundCase : null;
  }

  async updateStage(caseId: string, stageId: string, order: number): Promise<void> {
    const caseToUpdate = this.cases.find(c => c.id === caseId);

    if (caseToUpdate) {
      caseToUpdate.stageId = stageId;
      caseToUpdate.order = order;
    }
  }
}
