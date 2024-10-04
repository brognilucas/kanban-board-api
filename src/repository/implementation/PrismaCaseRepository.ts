import { PrismaClient } from "@prisma/client";
import CaseRepository from "../interfaces/CaseRepository";
import Case from "../../domain/Case";

export class PrismaCaseRepository implements CaseRepository {

  constructor(private prismaClient: PrismaClient = new PrismaClient()){ 
  }
  
  async getById(id: string): Promise<Case | null> {
    const caseOutput = await this.prismaClient.case.findUnique({
      where: { id },
      include: { 
        stage: true
      }
    });

    if (!caseOutput) return null;

    return new Case(caseOutput.id, caseOutput.name, caseOutput.description, caseOutput.order, caseOutput.stage.id);
  }
  
  async updateStage(caseId: string, stageId: string, order: number): Promise<void> {
    await this.prismaClient.case.update({ 
      where: { 
        id: caseId,
      },
      data: { 
        stage_id: stageId,
        order,
      }
    })
  }

  async create(input: Case): Promise<Case> {
    const createdCase = await this.prismaClient.case.create({
      data: { 
        id: input.id,
        name: input.name,
        description: input.description,
        order: input.order, 
        stage: { 
          connect: { 
            id: input.stageId,
          }
        }
      },
    });

    return new Case(createdCase.id, createdCase.description, createdCase.name, createdCase.order, createdCase.stage_id);
  }
  
}