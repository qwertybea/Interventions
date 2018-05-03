import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/caracteres-validator';
import { TypeService } from './type.service';
import { IType } from './type';
import { emailMatcherValidator } from '../shared/emailMatcher-validator';

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: FormGroup;
  typesProbleme: IType[];
  errorMessage: string;

  constructor(private fb: FormBuilder, private types: TypeService) { }

  // les conditions
  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenomProbleme: ['', [
        Validators.required,
        VerifierCaracteresValidator.longueurMinimum(3)
      ]],
      nomProbleme: ['', [
        Validators.required,
        VerifierCaracteresValidator.longueurMinimum(3)
      ]],
      typeProbleme: ['', [Validators.required]],
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}]
      }),
      telephone: [{value: '', disabled: true}]
    });

    this.types.obtenirTypes()
    .subscribe(typ => this.typesProbleme = typ,
               error => this.errorMessage = <any>error);
  } // ngOnInit

  appliquerNotifications(typeNotification: string): void {
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const courrielGroupControl = this.problemeForm.get('courrielGroup');
    const telephoneControl = this.problemeForm.get('telephone');

    // Set up
    courrielControl.clearValidators();
    courrielConfirmationControl.clearValidators();
    telephoneControl.clearValidators();

    courrielControl.reset();
    courrielConfirmationControl.reset();
    telephoneControl.reset();

    courrielControl.disable();
    courrielConfirmationControl.disable();
    telephoneControl.disable();

    // Conditional
    if(typeNotification === 'EXPEDITION') {
      courrielControl.enable();
      courrielConfirmationControl.enable();
      
      courrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      courrielConfirmationControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielConfirmation()])])
    } else {
      telephoneControl.enable();
      telephoneControl.setValidators([Validators.required]);
    }

    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    courrielGroupControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();

  }

}
