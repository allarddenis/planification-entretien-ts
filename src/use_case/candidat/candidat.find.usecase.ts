import { Candidat } from "@domain/candidat";
import registry from "@registry/registry";

export class ListCandidatesUseCase {

    private candidatRepository = registry.candidatRepository;

    async execute(searchParams: { email?: string }): Promise<Candidat[]> {
        return await this.candidatRepository.retrieveAll(searchParams);
    }
}