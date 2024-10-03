import { ICandidat } from './candidat.port';

export interface ICandidatRepository {
    save(candidat: ICandidat): Promise<ICandidat>;
    retrieveAll(searchParams: {email?: string}): Promise<ICandidat[]>;
    retrieveById(candidatId: number): Promise<ICandidat | null>;
    update(candidat: ICandidat): Promise<number>;
    delete(candidatId: number): Promise<number>;
    deleteAll(): Promise<number>;
}