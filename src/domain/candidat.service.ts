import Candidat from '../infrastructure/db/candidat/candidat.model';
import { ICandidatRepository } from '../infrastructure/db';
import candidatRepository from '../infrastructure/db/candidat/candidat.sql.repository';
import { Request, Response } from 'express';

class CandidatService {

    private candidatRepository: ICandidatRepository;

    constructor(repo: ICandidatRepository) {
        this.candidatRepository = repo;
    }

    async save(req: Request, res: Response) {
        let isEmailValid: boolean;

        const regexp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        isEmailValid = regexp.test(req.body.email);

        if (!req.body.langage || !req.body.xp || req.body.xp < 0 || !req.body.email || !isEmailValid) {
            res.status(400).send({
                message: 'Content can not be empty!'
            });
            return;
        }

        const candidat: Candidat = req.body;

        const savedCandidat = await this.candidatRepository.save(candidat);

        res.status(201).send(savedCandidat);
    }

    async retrieveAll(searchParams: { email?: string }): Promise<Candidat[]> {
        return await this.candidatRepository.retrieveAll(searchParams);
    }

    async retrieveById(candidatId: number): Promise<Candidat | null> {
        return await this.candidatRepository.retrieveById(candidatId);
    }

    async update(candidat: Candidat): Promise<number> {
        return await this.candidatRepository.update(candidat);
    }

    async delete(candidatId: number): Promise<number> {
        return await this.candidatRepository.delete(candidatId);
    }

    async deleteAll(): Promise<number> {
        return await this.candidatRepository.deleteAll();
    }
}

export default new CandidatService(candidatRepository);
