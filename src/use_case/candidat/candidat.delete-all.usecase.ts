import registry from "@registry/registry";

export class DeleteAllCandidatesUseCase {

    private candidatRepository = registry.repositories.candidatRepository;

    async execute(): Promise<number> {
        return await this.candidatRepository.deleteAll();
    }
}