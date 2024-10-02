import { Candidat, SaveRequest, SaveResponse } from "@domain/candidat";
import registry from "@registry/registry";

export class CreateCandidatUseCase {

    private candidatRepository = registry.candidatRepository;

    async execute(req: SaveRequest) : Promise<[SaveResponse, Candidat | null]> {
        let isEmailValid: boolean;

        const regexp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        isEmailValid = regexp.test(req.email);

        if (!req.langage || !req.xp || req.xp < 0 || !req.email || !isEmailValid) {
            return [SaveResponse.EMPTY_CONTENT, null];
        }

        const savedCandidat = await this.candidatRepository.save(req);

        return [SaveResponse.OK, savedCandidat];
    }
}