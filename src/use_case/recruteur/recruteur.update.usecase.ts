import { Recruteur } from "@domain/recruteur";
import registry from "@registry/registry";

export class UpdateRecruteurUseCase {

    private static recruteurRepository = registry.repositories.recruteurRepository;

    static async execute(recruteur: Recruteur): Promise<number> {
        return await this.recruteurRepository.update(recruteur);
    }
}