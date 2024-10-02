import { Candidat } from "@domain/candidat";
import registry from "@registry/registry";

export class UpdateCandidatUseCase {

    private candidatRepository = registry.repositories.candidatRepository;

    async execute(recruteur: Candidat): Promise<number> {
        return await this.candidatRepository.update(recruteur);
    }
}