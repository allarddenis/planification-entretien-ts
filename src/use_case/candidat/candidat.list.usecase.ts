import { Candidat } from "@domain/candidat";
import registry from "@registry/registry";

export class FindCandidatUseCase {

    private candidatRepository = registry.candidatRepository;

    async execute(candidatId: number): Promise<Candidat | null> {
        return await this.candidatRepository.retrieveById(candidatId);
    }
}