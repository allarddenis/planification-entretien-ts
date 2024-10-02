import { sqlCandidatRepository } from '@infrastructure/db/candidat';
import { ICandidatRepository, Candidat } from '@domain/candidat';

class CandidatService {

    private candidatRepository: ICandidatRepository;

    constructor(repo: ICandidatRepository) {
        this.candidatRepository = repo;
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

export default new CandidatService(sqlCandidatRepository);
