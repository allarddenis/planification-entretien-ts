import { ICandidatRepository } from "@domain/candidat";
import { sqlCandidatRepository } from "@infrastructure/db/candidat";

class Registry {
    private static instance: Registry;

    private candidatRepository: ICandidatRepository;

    private constructor() {
        this.candidatRepository = sqlCandidatRepository;
    }

    public static getInstance(): Registry {
        if (!Registry.instance) {
            Registry.instance = new Registry();
        }

        return Registry.instance;
    }

    public getCandidatRepository(): ICandidatRepository {
        return this.candidatRepository;
    }
}

export default Registry.getInstance();