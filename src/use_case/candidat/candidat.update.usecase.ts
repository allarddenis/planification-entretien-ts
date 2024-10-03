import { Candidat, ICandidatRepository } from "@domain/candidat";

export class UpdateCandidatUseCase {

    constructor(private candidatRepository: ICandidatRepository) {}

    async execute(candidat: Candidat): Promise<number> {
        return await this.candidatRepository.update(candidat);
    }
}