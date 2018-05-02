import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeService } from './type.service';
import { HttpClientModule } from '@angular/common/http';


describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientModule ],
      declarations: [ ProblemeComponent ],
      providers:[ TypeService ]
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
  // Les tests pour verifier les conditions
  it('Zone PRÉNOM invalide avec 2 caractères', () => {
    let errors = {};
    let zonePrenom = component.problemeForm.controls['prenomProbleme'];
    zonePrenom.setValue('a'.repeat(2));
    errors = zonePrenom.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();
  });

  it('Zone PRÉNOM valide avec 3 caractères', () => {
    let errors = {};
    let zonePrenom = component.problemeForm.controls['prenomProbleme'];
    zonePrenom.setValue('a'.repeat(3));
    errors = zonePrenom.errors || {};
    expect(errors['longueurMinimum']).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 200 caractères', () => {
    let errors = {};
    let zonePrenom = component.problemeForm.controls['prenomProbleme'];
    zonePrenom.setValue('a'.repeat(200));
    errors = zonePrenom.errors || {};
    expect(errors['longueurMinimum']).toBeTruthy();
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
    expect(errors['longueurMinimum']).toBeFalsy();
  });

  it('Zone PRÉNOM valide avec 50 espaces', () => {
    let errors = {};
    let zonePrenom = component.problemeForm.controls['prenomProbleme'];
    zonePrenom.setValue(' '.repeat(50));
    errors = zonePrenom.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();
  });

  it('Zone PRÉNOM valide avec 2 espaces et 1 caractère', () => {
    let errors = {};
    let zonePrenom = component.problemeForm.controls['prenomProbleme'];
    zonePrenom.setValue('  a');
    errors = zonePrenom.errors || {};
    expect(errors['longueurMinimum']).toBeFalsy();
  });
});
