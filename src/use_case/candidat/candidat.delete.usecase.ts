import { ICandidatRepository } from "@domain/candidat";

export class DeleteCandidatUseCase {

    constructor(private candidatRepository: ICandidatRepository) {}

    async execute(candidatId: number): Promise<number> {
        return await this.candidatRepository.delete(candidatId);
    }
}