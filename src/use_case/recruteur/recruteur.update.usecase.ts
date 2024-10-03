import { IRecruteurRepository, Recruteur } from "@domain/recruteur";

export class UpdateRecruteurUseCase {

    private recruteurRepository: IRecruteurRepository;

    constructor(recruteurRepository: IRecruteurRepository){
        this.recruteurRepository = recruteurRepository;
    }

    async execute(recruteur: Recruteur): Promise<number> {
        return await this.recruteurRepository.update(recruteur);
    }
}