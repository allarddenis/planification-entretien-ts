import { ICandidat, Candidat, ICandidatRepository, SaveCandidatRequest, SaveCandidatResult } from "@domain/candidat";
export class CreateCandidatUseCase {

    constructor(private candidatRepository: ICandidatRepository) {}

    async execute(req: SaveCandidatRequest) : Promise<[SaveCandidatResult, ICandidat | null]> {
        const candidat = new Candidat(req.id, req.langage, req.email, req.xp);

        const result = candidat.isValid();

        if (result !== SaveCandidatResult.OK) {
            return [result, null];
        }

        const savedCandidat = await this.candidatRepository.save(candidat);

        return [SaveCandidatResult.OK, savedCandidat];
    }
}