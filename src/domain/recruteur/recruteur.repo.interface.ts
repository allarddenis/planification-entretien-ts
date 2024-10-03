import { IRecruteur } from './recruteur.interface';

export interface IRecruteurRepository {
  save(recruteur: IRecruteur): Promise<IRecruteur>;
  retrieveAll(searchParams: {email?: string}): Promise<IRecruteur[]>;
  retrieveById(recruteurId: number): Promise<IRecruteur | null>;
  update(recruteur: IRecruteur): Promise<number>;
  delete(recruteurId: number): Promise<number>;
  deleteAll(): Promise<number>;
}
