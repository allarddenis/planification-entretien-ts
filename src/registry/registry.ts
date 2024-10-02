import { sqlCandidatRepository } from "@infrastructure/db/candidat";
import { sqlEntretienRepository } from "@infrastructure/db/entretien";
import { IEntretienRepository } from "@domain/entretien";
import { ICandidatRepository } from "@domain/candidat";

class Registry {
    private static instance: Registry;

    public readonly candidatRepository: ICandidatRepository = sqlCandidatRepository;
    public readonly entretienRepository: IEntretienRepository = sqlEntretienRepository;

    public static getInstance(): Registry {
        if (!Registry.instance) {
            Registry.instance = new Registry();
        }

        return Registry.instance;
    }
}

export default Registry.getInstance();