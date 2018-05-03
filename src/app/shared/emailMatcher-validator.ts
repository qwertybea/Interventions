import { AbstractControl, ValidatorFn } from '@angular/forms';
export class emailMatcherValidator {
    static courrielConfirmation(): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {

            let email = c.get('courriel');
            let emailConf = c.get('courrielConfirmation');

            if(!email.value || !emailConf.value ){
                return null;
            }
    
            if(email.value === emailConf.value){
                return null;
            }
    
            return {'Match': true};
        };
    }
}