import { ICandidat } from "@domain/candidat";
import { IRecruteur } from "@domain/recruteur";

export enum PlanificationResult {
    HORAIRE,
    CANDIDAT_PAS_TROUVE,
    RECRUTEUR_PAS_TROUVE,
    PAS_COMPATIBLE,
    CANDIDAT_TROP_JEUNE,
    OK,
}

export class IEntretien {
    id?: number;
    horaire?: string;
    candidatId?: number;
    recruteurId?: number;
}

export class Entretien {
    id?: number;
    horaire?: string;
    candidatId?: number;
    recruteurId?: number;

    static New(horaire: string, candidatId: number, recruteurId: number): Entretien {
        const entretien = new Entretien();
        entretien.horaire = horaire;
        entretien.candidatId = candidatId;
        entretien.recruteurId = recruteurId;
        return entretien;
    }

    static planifiable(candidat: ICandidat | null, recruteur: IRecruteur | null): PlanificationResult {
        if (!candidat) {
            return PlanificationResult.CANDIDAT_PAS_TROUVE;
        }

        if (!recruteur) {
            return PlanificationResult.RECRUTEUR_PAS_TROUVE;
        }

        if (recruteur.langage && candidat.langage && recruteur.langage != candidat.langage) {
            return PlanificationResult.PAS_COMPATIBLE;
        }

        if (recruteur.xp && candidat.xp && recruteur.xp < candidat.xp) {
            return PlanificationResult.CANDIDAT_TROP_JEUNE;
        }

        return PlanificationResult.OK;
    }
}
