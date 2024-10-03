import { IRecruteurRepository } from "@domain/recruteur";

export class DeleteAllRecrutersUseCase {

    constructor(private recruteurRepository: IRecruteurRepository) {}

    async execute(): Promise<number> {
        return await this.recruteurRepository.deleteAll();
    }
}