import { Recruteur } from "@domain/recruteur";

describe('Recruteur domain', () => {
    it('should not validate an empty recruteur', () => {
        const recruteur = new Recruteur();
        expect(recruteur.isValid()).toBe("EMPTY_CONTENT");
    })    

    it('should not validate a recruteur with email \'a\'', () => {
        const recruteur = new Recruteur(1, 'FR', 'a', 1);
        expect(recruteur.isValid()).toBe("EMPTY_CONTENT");
    })    

    it('should not validate a recruteur with email \'a@a.com\'', () => {
        const recruteur = new Recruteur(1, 'FR', 'a@a.com', 1);
        expect(recruteur.isValid()).toBe("EMPTY_CONTENT");
    })    

    it('should validate a recruteur with email ending with \'neosoft.fr\'', () => {
        const recruteur = new Recruteur(1, 'FR', 'a@neosoft.fr', 1);
        expect(recruteur.isValid()).toBe("OK");
    })    
})