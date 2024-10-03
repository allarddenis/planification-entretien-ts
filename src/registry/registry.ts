import { SqlCandidatRepository } from "@infrastructure/db/candidat";
import { SqlEntretienRepository } from "@infrastructure/db/entretien";
import { SqlRecruteurRepository } from "@infrastructure/db/recruteur";
import { IEntretienRepository } from "@domain/entretien";
import { ICandidatRepository } from "@domain/candidat";
import { IRecruteurRepository } from "@domain/recruteur";
import { INotificationService, NotificationService } from "@domain/notification";
import { CreateEntretienUseCase, ListEntretiensUseCase } from "@use_case/entretien";
import { CreateRecruteurUseCase, DeleteAllRecrutersUseCase, DeleteRecruteurUseCase, FindRecruiterUseCase, ListRecrutersUseCase, UpdateRecruteurUseCase } from "@use_case/recruteur";
import { CreateCandidatUseCase, DeleteAllCandidatesUseCase, DeleteCandidatUseCase, ListCandidatesUseCase, FindCandidatUseCase, UpdateCandidatUseCase } from "@use_case/candidat";

// Repositories
export const candidatRepository: ICandidatRepository = new SqlCandidatRepository();
export const entretienRepository: IEntretienRepository = new SqlEntretienRepository();
export const recruteurRepository: IRecruteurRepository = new SqlRecruteurRepository();

// Services
export const notificationService: INotificationService = new NotificationService();

// Use cases
export const createEntretienUseCase = new CreateEntretienUseCase(entretienRepository, candidatRepository, recruteurRepository, notificationService);
export const updateRecruteurUseCase = new UpdateRecruteurUseCase(recruteurRepository);
export const listRecrutersUseCase = new ListRecrutersUseCase(recruteurRepository);
export const listEntretiensUseCase = new ListEntretiensUseCase(entretienRepository);
export const createCandidatUseCase = new CreateCandidatUseCase(candidatRepository);
export const deleteAllCandidatesUseCase = new DeleteAllCandidatesUseCase(candidatRepository);
export const deleteCandidatUseCase = new DeleteCandidatUseCase(candidatRepository);
export const listCandidatesUseCase = new ListCandidatesUseCase(candidatRepository);
export const findCandidatUseCase = new FindCandidatUseCase(candidatRepository);
export const updateCandidatUseCase = new UpdateCandidatUseCase(candidatRepository);
export const createRecruteurUseCase = new CreateRecruteurUseCase(recruteurRepository);
export const deleteAllRecrutersUseCase = new DeleteAllRecrutersUseCase(recruteurRepository);
export const deleteRecruteurUseCase = new DeleteRecruteurUseCase(recruteurRepository);
export const findRecruiterUseCase = new FindRecruiterUseCase(recruteurRepository);