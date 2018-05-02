import { ValidatorFn, AbstractControl } from "@angular/forms";

export class VerifierCaracteresValidator {
    static sansEspaces(): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            let noSpace = c.value.replace(/ /g, '');
            if(noSpace.length >= 1) {
                return { 'sansEspaces': true };
            } else {
                return { 'sansEspaces': false };
            }
        };
    }

    static longueurMinimum(minLength: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if(c.value.trim().length >= minLength ) {
                return { 'longueurMinimum': true };
            } else {
                return { 'longueurMinimum': false };
            }
        };
    }
}