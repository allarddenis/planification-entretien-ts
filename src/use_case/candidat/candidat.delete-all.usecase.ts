import { ICandidatRepository } from "@domain/candidat";

export class DeleteAllCandidatesUseCase {

    constructor(private candidatRepository: ICandidatRepository) {}

    async execute(): Promise<number> {
        return await this.candidatRepository.deleteAll();
    }
}