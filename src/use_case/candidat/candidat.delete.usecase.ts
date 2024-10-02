import registry from "@registry/registry";

export class DeleteCandidatUseCase {

    private candidatRepository = registry.candidatRepository;

    async execute(candidatId: number): Promise<number> {
        return await this.candidatRepository.delete(candidatId);
    }
}