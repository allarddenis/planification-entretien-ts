import { Entretien, IEntretienRepository } from "@domain/entretien";

export class ListEntretiensUseCase {

    constructor(private entretienRepository: IEntretienRepository) {}
    
    async execute(): Promise<Entretien[]> {
        return await this.entretienRepository.retrieveAll();
    }
}
