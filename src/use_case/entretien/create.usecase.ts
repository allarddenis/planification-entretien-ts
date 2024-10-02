import { CreationRequest, CreationResult, Entretien, IEntretienRepository } from "@domain/entretien";
import recruteurRepository from "@infrastructure/db/recruteur/recruteur.repository";
import notificationService from "@domain/notification.service";
import registry from "@registry/registry";

export class CreateEntretienUseCase {
    private entretienRepository = registry.entretienRepository;
    private candidatRepository = registry.candidatRepository;

    async execute(req: CreationRequest) : Promise<[CreationResult, Entretien | null]> {
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
}
