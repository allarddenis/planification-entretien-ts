import { Entretien } from "@domain/entretien";
import registry from "@registry/registry";

export class ListEntretiensUseCase {
    private entretienRepository = registry.repositories.entretienRepository;

    async execute(): Promise<Entretien[]> {
        return await this.entretienRepository.retrieveAll();
    }
}
