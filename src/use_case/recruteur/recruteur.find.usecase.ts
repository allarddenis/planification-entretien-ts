import { IRecruteurRepository, IRecruteur } from "@domain/recruteur";

export class FindRecruiterUseCase {

    constructor(private recruteurRepository: IRecruteurRepository) {}

    async execute(recruteurId: number): Promise<IRecruteur | null> {
        return await this.recruteurRepository.retrieveById(recruteurId);
    }
}