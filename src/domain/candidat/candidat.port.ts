export interface SaveCandidatRequest {
    id: number;
    langage: string;
    email: string;
    xp: number;
}

export enum SaveCandidatResult {
    OK = 'OK',
    EMPTY_CONTENT = 'EMPTY_CONTENT'
}

export interface ICandidat {
    id?: number;
    langage?: string;
    email?: string;
    xp?: number;
}

export class Candidat {

    constructor(public id?: number, public langage?: string, public email?: string, public xp?: number) {}

    isValid(): SaveCandidatResult {
        let isEmailValid: boolean;

        const regexp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        isEmailValid = regexp.test(this.email || '');

        if (!this.langage || !this.xp || this.xp < 0 || !this.email || !isEmailValid || this.email.endsWith('neosoft.fr')) {
            return SaveCandidatResult.EMPTY_CONTENT;
        }

        return SaveCandidatResult.OK;
    }
}