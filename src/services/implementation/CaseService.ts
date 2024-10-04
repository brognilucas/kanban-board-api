import Case from '../../domain/Case';
import CaseRepository from '../../repository/interfaces/CaseRepository';
import ICaseService from '../interfaces/Case';
export default class CaseService implements ICaseService {

  constructor(private caseRepository: CaseRepository){}
  
  async getById(id: string): Promise<Case | null> {
    return this.caseRepository.getById(id);
  }

  async updateStage(caseId: string, stageId: string, order: number): Promise<void> {
    await this.caseRepository.updateStage(caseId, stageId, order);
  }

  async create(input: Case): Promise<Case> {
    const createdCase = await this.caseRepository.create(input);
    return createdCase;
  } 


}