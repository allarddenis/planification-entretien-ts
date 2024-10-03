import { IRecruteurRepository, Recruteur } from "@domain/recruteur";

export class FindRecruiterUseCase {

    constructor(private recruteurRepository: IRecruteurRepository) {}

    async execute(recruteurId: number): Promise<Recruteur | null> {
        return await this.recruteurRepository.retrieveById(recruteurId);
    }
}