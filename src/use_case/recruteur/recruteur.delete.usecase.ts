import { IRecruteurRepository } from "@domain/recruteur";

export class DeleteRecruteurUseCase {

    constructor(private recruteurRepository: IRecruteurRepository) {}

    async execute(recruteurId: number): Promise<number> {
        return await this.recruteurRepository.delete(recruteurId);
    }
}