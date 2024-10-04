import { PrismaClient } from "@prisma/client"
import ProjectRepository from "../interfaces/ProjectRepository"
import Project from "../../domain/Project"
import Stage from "../../domain/Stage"
import Case from "../../domain/Case"

export class PrismaProjectRepository implements ProjectRepository {

  constructor(private prismaClient: PrismaClient = new PrismaClient()) {
  }

  async create(input: Project) {
    const project = await this.prismaClient.project.create({
      data: {
        name: input.name,
        id: input.id,
        stages: {
          create: input.stages?.map((stage) => {
            return {
              id: stage.id,
              name: stage.name,
              sequence: stage.sequence,
            }
          })
        }
      },
      include: {
        stages: {
          include: {
            cases: true
          }
        }
      }
    })

    return new Project(project.id, project.name, this.getStagesFromInternalProject(project));
  }

  async findById(id: string) {
    const project = await this.prismaClient.project.findUnique({
      where: { id },
      include: {
        stages: {
          include: {
            cases: true
          }
        }
      }
    })

    if (!project) return null;

    const stages = this.getStagesFromInternalProject(project);
    return new Project(project.id, project.name, stages);
  }

  async findAll() {
    const projectsOutput = await this.prismaClient.project.findMany({
      include: {
        stages: {
          include: {
            cases: true
          }
        }
      }
    })

    return projectsOutput.map((project: any) => {
      const stages = this.getStagesFromInternalProject(project);
      return new Project(project.id, project.name, stages)
    });
  }

  private getStagesFromInternalProject(project: any): Stage[] {
    return project.stages.map((stage: any) => {
      const cases = stage.cases.map((caseItem: any) => new Case(caseItem.id, caseItem.name, caseItem.description, caseItem.order, caseItem.stage_id))
      return new Stage(stage.id, stage.name, stage.sequence, stage.project_id, cases)
    })
  }

  async addStage(project: Project, stage: Stage): Promise<Project> {
    const updatedProject = await this.prismaClient.project.update({
      include: {
        stages: {
          include: {
            cases: true
          }
        }
      },
      where: { id: project.id },
      data: {
        stages: {
          create: {
            name: stage.name,
            id: stage.id,
            sequence: stage.sequence
          }
        },
      },
    });
    const stages = this.getStagesFromInternalProject(updatedProject);

    return new Project(updatedProject.id, updatedProject.name, stages);
  }
}
