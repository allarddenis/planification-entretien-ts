import { Candidat, ICandidat, ICandidatRepository } from "@domain/candidat";

export class ListCandidatesUseCase {

    constructor(private candidatRepository: ICandidatRepository) {}

    async execute(searchParams: { email?: string }): Promise<ICandidat[]> {
        return await this.candidatRepository.retrieveAll(searchParams);
    }
}