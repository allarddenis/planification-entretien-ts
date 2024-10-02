import { Recruteur } from './recruteur.interface';

export interface IRecruteurRepository {
  save(recruteur: Recruteur): Promise<Recruteur>;
  retrieveAll(searchParams: {email?: string}): Promise<Recruteur[]>;
  retrieveById(recruteurId: number): Promise<Recruteur | null>;
  update(recruteur: Recruteur): Promise<number>;
  delete(recruteurId: number): Promise<number>;
  deleteAll(): Promise<number>;
}
