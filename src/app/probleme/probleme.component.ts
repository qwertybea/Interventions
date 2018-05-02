import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/caracteres-validator';
import { TypeService } from './type.service';
import { IType } from './type';

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
      typeProbleme: ['', []]
    });

    this.types.obtenirTypes()
    .subscribe(typ => this.typesProbleme = typ,
               error => this.errorMessage = <any>error);
  }

}
