import { Recruteur } from "@domain/recruteur";
import registry from "@registry/registry";

export class ListRecrutersUseCase {

    private static recruteurRepository = registry.repositories.recruteurRepository;

    static async execute(searchParams: { email?: string }): Promise<Recruteur[]> {
        return await this.recruteurRepository.retrieveAll(searchParams);
    }
}