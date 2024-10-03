import { Candidat } from "@domain/candidat";
import { Recruteur } from "@domain/recruteur";

export interface CreationEntretienRequest {
    disponibiliteRecruteur: string;
    horaire: string;
    recruteurId: number;
    candidatId: number;
}

export enum CreationEntretienResult {
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

    static planifiable(candidat: Candidat | null, recruteur: Recruteur | null): CreationEntretienResult {
        if (!candidat) {
            return CreationEntretienResult.CANDIDAT_PAS_TROUVE;
        }

        if (!recruteur) {
            return CreationEntretienResult.RECRUTEUR_PAS_TROUVE;
        }

        if (recruteur.langage && candidat.langage && recruteur.langage != candidat.langage) {
            return CreationEntretienResult.PAS_COMPATIBLE;
        }

        if (recruteur.xp && candidat.xp && recruteur.xp < candidat.xp) {
            return CreationEntretienResult.CANDIDAT_TROP_JEUNE;
        }

        return CreationEntretienResult.OK;
    }
}
