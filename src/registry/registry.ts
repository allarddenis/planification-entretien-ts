import { sqlCandidatRepository } from "@infrastructure/db/candidat";
import { sqlEntretienRepository } from "@infrastructure/db/entretien";
import { sqlRecruteurRepository } from "@infrastructure/db/recruteur";
import { IEntretienRepository } from "@domain/entretien";
import { ICandidatRepository } from "@domain/candidat";
import { IRecruteurRepository } from "@domain/recruteur";

class Registry {
    private static instance: Registry;

    public readonly repositories: Repositories = new Repositories();

    public static getInstance(): Registry {
        if (!Registry.instance) {
            Registry.instance = new Registry();
        }

        return Registry.instance;
    }
}

class Repositories {
    public readonly candidatRepository: ICandidatRepository = sqlCandidatRepository;
    public readonly entretienRepository: IEntretienRepository = sqlEntretienRepository;
    public readonly recruteurRepository: IRecruteurRepository = sqlRecruteurRepository;
}

export default Registry.getInstance();