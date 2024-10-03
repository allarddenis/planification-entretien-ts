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
``
export interface Entretien {
    id?: number;
    horaire?: string;
    candidatId?: number;
    recruteurId?: number;
  }
  