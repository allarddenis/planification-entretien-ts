import { Candidat } from "@domain/candidat";
import registry from "@registry/registry";

export class UpdateCandidatUseCase {

    private candidatRepository = registry.candidatRepository;

    async execute(candidat: Candidat): Promise<number> {
        return await this.candidatRepository.update(candidat);
    }
}