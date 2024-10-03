import { CreationEntretienRequest, CreationEntretienResult, Entretien, IEntretienRepository } from "@domain/entretien";
import registry from "@registry/registry";

export class CreateEntretienUseCase {
    private entretienRepository = registry.repositories.entretienRepository;
    private candidatRepository = registry.repositories.candidatRepository;
    private recruteurRepository = registry.repositories.recruteurRepository;
    private notificationService = registry.services.notificationService;

    async execute(req: CreationEntretienRequest) : Promise<[CreationEntretienResult, Entretien | null]> {
        if (req.disponibiliteRecruteur != req.horaire) {
            return [CreationEntretienResult.HORAIRE, null];
        }

        const recruteur = await this.recruteurRepository.retrieveById(req.recruteurId);
        const candidat = await this.candidatRepository.retrieveById(req.candidatId);

        if (!candidat) {
            return [CreationEntretienResult.CANDIDAT_PAS_TROUVE, null];
        }

        if (!recruteur) {
            return [CreationEntretienResult.RECRUTEUR_PAS_TROUVE, null];
        }

        if (recruteur.langage && candidat?.langage && recruteur.langage != candidat.langage) {
            return [CreationEntretienResult.PAS_COMPATIBLE, null];
        }

        if (recruteur?.xp && candidat?.xp && recruteur.xp < candidat.xp) {
            return [CreationEntretienResult.CANDIDAT_TROP_JEUNE, null];
        }

        const savedEntretien = await this.entretienRepository.save(req);

        await this.notificationService.envoyerEmailDeConfirmationAuCandidat(candidat?.email || '');
        await this.notificationService.envoyerEmailDeConfirmationAuRecruteur(recruteur?.email || '');

        return [CreationEntretienResult.OK, savedEntretien];
    }
}
