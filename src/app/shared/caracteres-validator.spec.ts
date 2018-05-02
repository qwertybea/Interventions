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

describe('longueurMinimum Validator', () => {
    it('Invalide sur 1 espace et 2 caractères', () => {
        let control = { value: ' '.repeat(1) + 'X'.repeat(2) }
        let validator = VerifierCaracteresValidator.longueurMinimum(3);
        let result = validator(control as AbstractControl);
        expect(result['longueurMinimum']).toBe(false);
    });
    it('Invalide sur 2 espaces et 1 caractère', () => {
        let control = { value: ' '.repeat(2) + 'X'.repeat(1) }
        let validator = VerifierCaracteresValidator.longueurMinimum(3);
        let result = validator(control as AbstractControl);
        expect(result['longueurMinimum']).toBe(false);
    });
    it('Valide sur 3 espaces et 3 caractères', () => {
        let control = { value: ' '.repeat(3) + 'X'.repeat(3) }
        let validator = VerifierCaracteresValidator.longueurMinimum(3);
        let result = validator(control as AbstractControl);
        expect(result['longueurMinimum']).toBe(true);
    });
    it('Valide sur 5 espaces et 5 caractères et 5 espaces', () => {
        let control = { value: ' '.repeat(5) + 'X'.repeat(5) + ' '.repeat(5) }
        let validator = VerifierCaracteresValidator.longueurMinimum(3);
        let result = validator(control as AbstractControl);
        expect(result['longueurMinimum']).toBe(true);
    });
});