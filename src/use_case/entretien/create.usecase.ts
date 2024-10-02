import { ICandidatRepository, SaveRequest, SaveResponse, Candidat } from "@domain/candidat";
import { sqlCandidatRepository } from "@infrastructure/db/candidat";

class CreateEntretienUseCase {
    private candidatRepository: ICandidatRepository;

    constructor(repo: ICandidatRepository) {
        this.candidatRepository = repo;
    }

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

export const createEntretienUseCase = new CreateEntretienUseCase(sqlCandidatRepository);