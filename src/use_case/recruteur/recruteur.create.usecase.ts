import { Recruteur, SaveRequest, SaveResponse } from "@domain/recruteur";
import registry from "@registry/registry";

export class CreateRecruteurUseCase {

    private static recruteurRepository = registry.repositories.recruteurRepository;

    static async execute(req: SaveRequest) : Promise<[SaveResponse, Recruteur | null]> {
        let isEmailValid: boolean;

        const regexp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        isEmailValid = regexp.test(req.email);

        if (!req.langage || !req.xp || req.xp < 0 || !req.email || !isEmailValid) {
            return [SaveResponse.EMPTY_CONTENT, null];
        }

        const savedRecruteur = await this.recruteurRepository.save(req);

        return [SaveResponse.OK, savedRecruteur];
    }
}