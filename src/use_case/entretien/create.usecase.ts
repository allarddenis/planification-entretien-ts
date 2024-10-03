import { ICreationEntretienHttpRequest } from "@infrastructure/api/entretien/entretien.inputs";
import { PlanificationResult, IEntretien, Entretien, IEntretienRepository } from "@domain/entretien";
import { ICandidatRepository } from "@domain/candidat";
import { IRecruteurRepository } from "@domain/recruteur";
import { INotificationService } from "@domain/notification";

interface ICreateEntretienUseCase {
    execute(req: ICreationEntretienHttpRequest) : Promise<[PlanificationResult, IEntretien | null]>;
}

export class CreateEntretienUseCase {
    private entretienRepository: IEntretienRepository;
    private candidatRepository: ICandidatRepository;
    private recruteurRepository: IRecruteurRepository;
    private notificationService: INotificationService;

    constructor(entretienRepository: IEntretienRepository, candidatRepository: ICandidatRepository, recruteurRepository: IRecruteurRepository, notificationService: INotificationService) {
        this.entretienRepository = entretienRepository;
        this.candidatRepository = candidatRepository;
        this.recruteurRepository = recruteurRepository;
        this.notificationService = notificationService;
    }

    async execute(req: ICreationEntretienHttpRequest) : Promise<[PlanificationResult, IEntretien | null]> {
        if (req.disponibiliteRecruteur != req.horaire) {
            return [PlanificationResult.HORAIRE, null];
        }

        const recruteur = await this.recruteurRepository.retrieveById(req.recruteurId);
        const candidat = await this.candidatRepository.retrieveById(req.candidatId);

        const planifiable = Entretien.planifiable(candidat, recruteur);
        if (planifiable != PlanificationResult.OK) {
            return [planifiable, null];
        }
        
        const savedEntretien = await this.entretienRepository.save(req);

        await this.notificationService.envoyerEmailDeConfirmationAuCandidat(candidat?.email || '');
        await this.notificationService.envoyerEmailDeConfirmationAuRecruteur(recruteur?.email || '');

        return [PlanificationResult.OK, savedEntretien];
    }
}