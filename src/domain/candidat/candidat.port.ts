export interface SaveCandidatRequest {
    id: number;
    langage: string;
    email: string;
    xp: number;
}

export enum SaveCandidatResponse {
    OK,
    EMPTY_CONTENT
}

export interface Candidat {
    id?: number;
    langage?: string;
    email?: string;
    xp?: number;
}