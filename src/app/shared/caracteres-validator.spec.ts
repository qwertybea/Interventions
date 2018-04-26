import { VerifierCaracteresValidator } from "./caracteres-validator";
import { AbstractControl } from "@angular/forms";

describe('sansEspaces Validator', () => {
    it('Invalide sur chaine vide', () => {
        let control = { value: '' }
        let validator = VerifierCaracteresValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result['sansEspaces']).toBe(false);
    });
    it('Invalide sur chaine de 10 espaces', () => {
        let control = { value: ' '.repeat(10) }
        let validator = VerifierCaracteresValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result['sansEspaces']).toBe(false);
    });
    it('Valide sur chaine de mots', () => {
        let control = { value: 'hello world' }
        let validator = VerifierCaracteresValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result['sansEspaces']).toBe(true);
    });
    it('Valide sur chaine de mots debutant et terminant par 3 espaces', () => {
        let control = { value: '   hello world   ' }
        let validator = VerifierCaracteresValidator.sansEspaces();
        let result = validator(control as AbstractControl);
        expect(result['sansEspaces']).toBe(true);
    });
});
