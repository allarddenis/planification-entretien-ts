import { Recruteur } from "@domain/recruteur";
import registry from "@registry/registry";

export class FindRecruiterUseCase {

    private static recruteurRepository = registry.repositories.recruteurRepository;

    static async execute(recruteurId: number): Promise<Recruteur | null> {
        return await this.recruteurRepository.retrieveById(recruteurId);
    }
}