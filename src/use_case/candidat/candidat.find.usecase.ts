import { Candidat, ICandidatRepository } from "@domain/candidat";

export class ListCandidatesUseCase {

    constructor(private candidatRepository: ICandidatRepository) {}

    async execute(searchParams: { email?: string }): Promise<Candidat[]> {
        return await this.candidatRepository.retrieveAll(searchParams);
    }
}