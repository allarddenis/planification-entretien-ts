import { CreationEntretienRequest, CreationEntretienResult, IEntretien, Entretien } from "@domain/entretien";
import registry from "@registry/registry";

export class CreateEntretienUseCase {
    private entretienRepository = registry.repositories.entretienRepository;
    private candidatRepository = registry.repositories.candidatRepository;
    private recruteurRepository = registry.repositories.recruteurRepository;
    private notificationService = registry.services.notificationService;

    async execute(req: CreationEntretienRequest) : Promise<[CreationEntretienResult, IEntretien | null]> {
        if (req.disponibiliteRecruteur != req.horaire) {
            return [CreationEntretienResult.HORAIRE, null];
        }

        const recruteur = await this.recruteurRepository.retrieveById(req.recruteurId);
        const candidat = await this.candidatRepository.retrieveById(req.candidatId);

        const planifiable = Entretien.planifiable(candidat, recruteur);
        if (planifiable != CreationEntretienResult.OK) {
            return [planifiable, null];
        }
        
        const savedEntretien = await this.entretienRepository.save(req);

        await this.notificationService.envoyerEmailDeConfirmationAuCandidat(candidat?.email || '');
        await this.notificationService.envoyerEmailDeConfirmationAuRecruteur(recruteur?.email || '');

        return [CreationEntretienResult.OK, savedEntretien];
    }
}
