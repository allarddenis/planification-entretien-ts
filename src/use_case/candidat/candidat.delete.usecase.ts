import registry from "@registry/registry";

export class DeleteCandidatUseCase {

    private candidatRepository = registry.repositories.candidatRepository;

    async execute(candidatId: number): Promise<number> {
        return await this.candidatRepository.delete(candidatId);
    }
}