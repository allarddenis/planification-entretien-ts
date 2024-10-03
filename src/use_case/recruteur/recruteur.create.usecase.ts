import { IRecruteurRepository, Recruteur, SaveRecruteurRequest, SaveRecruteurResult } from "@domain/recruteur";

export class CreateRecruteurUseCase {

    constructor(private recruteurRepository: IRecruteurRepository) {}

    async execute(req: SaveRecruteurRequest) : Promise<[SaveRecruteurResult, Recruteur | null]> {
        const recruteur = new Recruteur(req.id, req.langage, req.email, req.xp);

        const result = recruteur.isValid();

        if (result !== SaveRecruteurResult.OK) {
            return [result, null];
        }

        const savedRecruteur = await this.recruteurRepository.save(recruteur);

        return [SaveRecruteurResult.OK, savedRecruteur];
    }
}