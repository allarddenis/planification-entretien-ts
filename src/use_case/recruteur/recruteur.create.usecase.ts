import { Recruteur, SaveRecruteurRequest, SaveRecruteurResponse } from "@domain/recruteur";
import registry from "@registry/registry";

export class CreateRecruteurUseCase {

    private static recruteurRepository = registry.repositories.recruteurRepository;

    static async execute(req: SaveRecruteurRequest) : Promise<[SaveRecruteurResponse, Recruteur | null]> {
        let isEmailValid: boolean;

        const regexp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        isEmailValid = regexp.test(req.email);

        if (!req.langage || !req.xp || req.xp < 0 || !req.email || !isEmailValid) {
            return [SaveRecruteurResponse.EMPTY_CONTENT, null];
        }

        const savedRecruteur = await this.recruteurRepository.save(req);

        return [SaveRecruteurResponse.OK, savedRecruteur];
    }
}