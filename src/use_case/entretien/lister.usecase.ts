import { Entretien } from "@domain/entretien";
import registry from "@registry/registry";

export class CreateEntretienUseCase {
    private entretienRepository = registry.entretienRepository;

    async execute(): Promise<Entretien[]> {
        return await this.entretienRepository.retrieveAll();
    }
}
