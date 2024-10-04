import { randomUUID } from "crypto";
import Case from "./Case";

export default class Stage {
  id: string;
  name: string;
  sequence: number;
  projectId: string;
  cases?: Case[]

  constructor(id: string, name: string, sequence: number, projectId: string, cases: Case[] = []) {
    this.id = id;
    this.name = name;
    this.sequence = sequence;
    this.projectId = projectId;
    this.cases = cases;
  }

  getNextCaseOrder() { 
    return this.cases!.length + 1;
  }

  addCase(name: string, description: string) {
    const caseOutput = Case.build(name, description, this.cases!.length + 1, this.id);
    this.cases?.push(caseOutput);
    return caseOutput;
  }

  static build(name: string, sequence: number, projectId: string) {
    return new Stage(randomUUID(), name, sequence, projectId);
  }
}