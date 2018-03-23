import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('Zone PRÉNOM invalide avec 2 caractères', () => {
    let errors = {};
    let zonePrenom = component.problemeForm.controls['prenomProbleme'];
    zonePrenom.setValue('a'.repeat(2));
    errors = zonePrenom.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 3 caractères', () => {
    let zonePrenom = component.problemeForm.controls['prenomProbleme'];
    zonePrenom.setValue('a'.repeat(3));
    expect(zonePrenom.valid).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 200 caractères', () => {
    let zonePrenom = component.problemeForm.controls['prenomProbleme'];
    zonePrenom.setValue('a'.repeat(200));
    expect(zonePrenom.valid).toBeTruthy();
  });

  it('Zone PRÉNOM invalide avec aucune valeur', () => {
    let errors = {};
    let zonePrenom = component.problemeForm.controls['prenomProbleme'];
    errors = zonePrenom.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Zone PRÉNOM invalide avec 1 caractère', () => {
    let errors = {};
    let zonePrenom = component.problemeForm.controls['prenomProbleme'];
    zonePrenom.setValue('a');
    errors = zonePrenom.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 50 espaces', () => {
    let zonePrenom = component.problemeForm.controls['prenomProbleme'];
    zonePrenom.setValue(' '.repeat(50));
    expect(zonePrenom.valid).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 2 espaces et 1 caractère', () => {
    let zonePrenom = component.problemeForm.controls['prenomProbleme'];
    zonePrenom.setValue('  a');
    expect(zonePrenom.valid).toBeTruthy();
  });
});
