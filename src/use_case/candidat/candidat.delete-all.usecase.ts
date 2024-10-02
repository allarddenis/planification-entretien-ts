import registry from "@registry/registry";

export class DeleteAllCandidatesUseCase {

    private candidatRepository = registry.candidatRepository;

    async execute(): Promise<number> {
        return await this.candidatRepository.deleteAll();
    }
}