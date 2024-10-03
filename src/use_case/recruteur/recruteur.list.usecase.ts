import { IRecruteurRepository, Recruteur } from "@domain/recruteur";

export class ListRecrutersUseCase {
    
    constructor(private recruteurRepository: IRecruteurRepository) {}

    async execute(searchParams: { email?: string }): Promise<Recruteur[]> {
        return await this.recruteurRepository.retrieveAll(searchParams);
    }
}