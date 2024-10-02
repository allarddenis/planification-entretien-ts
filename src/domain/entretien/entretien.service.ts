import recruteurRepository from '../../infrastructure/db/recruteur/recruteur.repository';
import candidatRepository from '../../infrastructure/db/candidat/candidat.sql.repository';
import Entretien from '../../infrastructure/db/entretien/entretien.model';
import entretienRepository from '../../infrastructure/db/entretien/entretien.repository';
import notificationService from '.././notification.service';
import { ICandidatRepository, IEntretienRepository } from '../../infrastructure/db';
import { CreationResult, CreationRequest } from './entretien.model';

class EntretienService {

    private entretienRepository: IEntretienRepository;
    private candidatRepository: ICandidatRepository;

    constructor(repoEntretien: IEntretienRepository, repoCandidat: ICandidatRepository) {
        this.entretienRepository = repoEntretien;
        this.candidatRepository = repoCandidat;
    }

    async create(req: CreationRequest) : Promise<[CreationResult, Entretien | null]> {
        if (req.disponibiliteRecruteur != req.horaire) {
            return [CreationResult.HORAIRE, null];
        }

        const recruteur = await recruteurRepository.retrieveById(req.recruteurId);
        const candidat = await this.candidatRepository.retrieveById(req.candidatId);

        if (!candidat) {
            return [CreationResult.CANDIDAT_PAS_TROUVE, null];
        }

        if (!recruteur) {
            return [CreationResult.RECRUTEUR_PAS_TROUVE, null];
        }

        if (recruteur.langage && candidat?.langage && recruteur.langage != candidat.langage) {
            return [CreationResult.PAS_COMPATIBLE, null];
        }

        if (recruteur?.xp && candidat?.xp && recruteur.xp < candidat.xp) {
            return [CreationResult.CANDIDAT_TROP_JEUNE, null];
        }


        const savedEntretien = await this.entretienRepository.save(req);

        await notificationService.envoyerEmailDeConfirmationAuCandidat(candidat?.email || '');
        await notificationService.envoyerEmailDeConfirmationAuRecruteur(recruteur?.email || '');

        return [CreationResult.OK, savedEntretien];
    }

    async retrieveAll(): Promise<Entretien[]> {
        return await this.entretienRepository.retrieveAll();
    }
}

export default new EntretienService(entretienRepository, candidatRepository);
