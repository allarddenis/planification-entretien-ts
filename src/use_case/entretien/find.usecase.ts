import { Entretien, IEntretienRepository } from "@domain/entretien";
import { IRecruteurRepository } from "@domain/recruteur";
import { ICandidatRepository } from "@domain/candidat";

interface FindEntretienUseCaseResult extends Entretien {
    candidatEmail: string;
    recruteurEmail: string;
}

export class FindEntretienUseCase {

    constructor(
        private entretienRepository: IEntretienRepository,
        private candidatRepository: ICandidatRepository,
        private recruteurRepository: IRecruteurRepository
    ) {}
    
    async execute(id: number): Promise<FindEntretienUseCaseResult | null> {
        const entretien = await this.entretienRepository.retrieveById(id);
        if (!entretien) {
            return null;
        }
        const candidat = await this.candidatRepository.retrieveById(entretien.candidatId as number);
        const recruteur = await this.recruteurRepository.retrieveById(entretien.recruteurId as number);
    
        return {
            id: entretien.id,
            horaire: entretien.horaire,
            candidatId: entretien.candidatId,
            recruteurId: entretien.recruteurId,
            candidatEmail: candidat?.email as string,
            recruteurEmail: recruteur?.email as string
        };
    }
}
