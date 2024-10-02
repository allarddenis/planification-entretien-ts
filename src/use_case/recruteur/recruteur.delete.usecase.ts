import registry from "@registry/registry";

export class DeleteRecruteurUseCase {

    private static recruteurRepository = registry.repositories.recruteurRepository;

    static async execute(recruteurId: number): Promise<number> {
        return await this.recruteurRepository.delete(recruteurId);
    }
}