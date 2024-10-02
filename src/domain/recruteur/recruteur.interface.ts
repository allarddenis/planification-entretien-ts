export interface SaveRequest {
    id: number;
    langage: string;
    email: string;
    xp: number;
}

export enum SaveResponse {
    OK,
    EMPTY_CONTENT
}

export interface Recruteur {
    id?: number;
    langage?: string;
    email?: string;
    xp?: number;
  }
  