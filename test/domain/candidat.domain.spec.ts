import { Candidat } from "@domain/candidat";

describe('Candidat domain', () => {
    it('should not validate an empty candidat', () => {
        const candidat = new Candidat();
        expect(candidat.isValid()).toBe("EMPTY_CONTENT");
    })    

    it('should not validate a candidat with email \'a\'', () => {
        const candidat = new Candidat(1, 'FR', 'a', 1);
        expect(candidat.isValid()).toBe("EMPTY_CONTENT");
    })    

    it('should validate a candidat with email \'a@a.com\'', () => {
        const candidat = new Candidat(1, 'FR', 'a@a.com', 1);
        expect(candidat.isValid()).toBe("OK");
    })    

    it('should not validate a candidat with email ending with \'neosoft.fr\'', () => {
        const candidat = new Candidat(1, 'FR', 'a@neosoft.fr', 1);
        expect(candidat.isValid()).toBe("EMPTY_CONTENT");
    })    
})