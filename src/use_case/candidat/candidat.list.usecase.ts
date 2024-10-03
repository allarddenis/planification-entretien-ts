import { Candidat, ICandidatRepository } from "@domain/candidat";

export class FindCandidatUseCase {

    constructor(private candidatRepository: ICandidatRepository) {}

    async execute(candidatId: number): Promise<Candidat | null> {
        return await this.candidatRepository.retrieveById(candidatId);
    }
}