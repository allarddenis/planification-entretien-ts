import { IRecruteurRepository, IRecruteur } from "@domain/recruteur";

export class ListRecrutersUseCase {
    
    constructor(private recruteurRepository: IRecruteurRepository) {}

    async execute(searchParams: { email?: string }): Promise<IRecruteur[]> {
        return await this.recruteurRepository.retrieveAll(searchParams);
    }
}