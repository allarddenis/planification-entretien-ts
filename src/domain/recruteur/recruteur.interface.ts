export interface SaveRecruteurRequest {
    id: number;
    langage: string;
    email: string;
    xp: number;
}

export enum SaveRecruteurResponse {
    OK,
    EMPTY_CONTENT
}

export interface Recruteur {
    id?: number;
    langage?: string;
    email?: string;
    xp?: number;
  }
  