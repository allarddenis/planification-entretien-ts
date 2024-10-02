import { ICandidatRepository } from "./candidat.interface";
import { sqlCandidatRepository } from "@infrastructure/db/candidat";
import { Candidat, SaveRequest, SaveResponse } from "./candidat.port";

class CandidatService {

    private candidatRepository: ICandidatRepository;

    constructor(repo: ICandidatRepository) {
        this.candidatRepository = repo;
    }

    async save(req: SaveRequest) : Promise<[SaveResponse, Candidat | null]> {
        let isEmailValid: boolean;

        const regexp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        isEmailValid = regexp.test(req.email);

        if (!req.langage || !req.xp || req.xp < 0 || !req.email || !isEmailValid) {
            return [SaveResponse.EMPTY_CONTENT, null];
        }

        const savedCandidat = await this.candidatRepository.save(req);

        return [SaveResponse.OK, savedCandidat];
    }

    async retrieveAll(searchParams: { email?: string }): Promise<Candidat[]> {
        return await this.candidatRepository.retrieveAll(searchParams);
    }

    async retrieveById(candidatId: number): Promise<Candidat | null> {
        return await this.candidatRepository.retrieveById(candidatId);
    }

    async update(candidat: Candidat): Promise<number> {
        return await this.candidatRepository.update(candidat);
    }

    async delete(candidatId: number): Promise<number> {
        return await this.candidatRepository.delete(candidatId);
    }

    async deleteAll(): Promise<number> {
        return await this.candidatRepository.deleteAll();
    }
}

export default new CandidatService(sqlCandidatRepository);
