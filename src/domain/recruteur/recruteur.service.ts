import { IRecruteurRepository } from '../../infrastructure/db';
import Recruteur from '../../infrastructure/db/recruteur/recruteur.model';
import recruteurRepository from '../../infrastructure/db/recruteur/recruteur.repository';
import { Request, Response } from 'express';
import { SaveRequest, SaveResponse } from '../candidat/candidat.model';

class RecruteurService {
    private recruteurRepository: IRecruteurRepository;

    constructor(repo: IRecruteurRepository) {
        this.recruteurRepository = repo;
    }

    async save(req: SaveRequest) : Promise<[SaveResponse, Recruteur | null]> {
        let isEmailValid: boolean;

        const regexp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        isEmailValid = regexp.test(req.email);

        if (!req.langage || !req.xp || req.xp < 0 || !req.email || !isEmailValid) {
            return [SaveResponse.EMPTY_CONTENT, null];
        }

        const savedRecruteur = await this.recruteurRepository.save(req);

        return [SaveResponse.OK, savedRecruteur];
    }

    async retrieveAll(searchParams: { email?: string }): Promise<Recruteur[]> {
        return await this.recruteurRepository.retrieveAll(searchParams);
    }

    async retrieveById(recruteurId: number): Promise<Recruteur | null> {
        return await this.recruteurRepository.retrieveById(recruteurId);
    }

    async update(recruteur: Recruteur): Promise<number> {
        return await this.recruteurRepository.update(recruteur);
    }

    async delete(recruteurId: number): Promise<number> {
        return await this.recruteurRepository.delete(recruteurId);
    }

    async deleteAll(): Promise<number> {
        return await this.recruteurRepository.deleteAll();
    }
}

export default new RecruteurService(recruteurRepository);
