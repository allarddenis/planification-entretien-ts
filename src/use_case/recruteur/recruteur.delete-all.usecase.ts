import registry from "@registry/registry";

export class DeleteAllRecrutersUseCase {

    private static recruteurRepository = registry.repositories.recruteurRepository;

    static async execute(): Promise<number> {
        return await this.recruteurRepository.deleteAll();
    }
}