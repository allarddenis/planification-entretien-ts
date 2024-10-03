import { Candidat, ICandidatRepository, SaveCandidatRequest, SaveCandidatResponse } from "@domain/candidat";
export class CreateCandidatUseCase {

    constructor(private candidatRepository: ICandidatRepository) {}

    async execute(req: SaveCandidatRequest) : Promise<[SaveCandidatResponse, Candidat | null]> {
        let isEmailValid: boolean;

        const regexp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        isEmailValid = regexp.test(req.email);

        if (!req.langage || !req.xp || req.xp < 0 || !req.email || !isEmailValid) {
            return [SaveCandidatResponse.EMPTY_CONTENT, null];
        }

        const savedCandidat = await this.candidatRepository.save(req);

        return [SaveCandidatResponse.OK, savedCandidat];
    }
}