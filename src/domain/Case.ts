import { randomUUID } from "crypto";

export default class Case { 
  id: string;
  stageId: string;
  name: string; 
  description: string;
  order: number;

  constructor(id: string, name: string, description: string, order: number, stageId: string) { 
    this.id = id; 
    this.name = name;
    this.description = description;
    this.order = order;
    this.stageId = stageId;
  }

  static build(name: string, description: string, order: number, stageId: string) { 
    const id = randomUUID();
    return new Case(id, name, description, order, stageId);
  }
}