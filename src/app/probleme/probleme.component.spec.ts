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

  // TP-12| NON NOTIFIER
  // COURRIEL

  it('Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });

  // TELEPHONE

  it('Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.appliquerNotifications('');
    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toBeNull();
  });

  // TP-13 | NOTIFIER COURRIEL

  it('Zone TELEPHONE est désactivée quand notifier par courriel', () =>{
    component.appliquerNotifications('COURRIEL');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });
  
  it('Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('COURRIEL');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).not.toEqual('DISABLED');
  });
  
  it('Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('COURRIEL');
    let errors = {};
    
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  
  it('Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('COURRIEL');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('');
    errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  
  it('Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.appliquerNotifications('COURRIEL');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue('ecineic');
    errors = zone.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });
  
  it('Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur retourne null', () => {
    component.appliquerNotifications('COURRIEL');
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneValidation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue('');
    zoneValidation.setValue('test@hotmail.com');
    let zoneGroup = component.problemeForm.get('courrielGroup');
   let errors = zoneGroup.errors || {};
    expect(errors['Match']).toBeUndefined();
  });
  
  it('Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.appliquerNotifications('COURRIEL');
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneValidation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneValidation.setValue('');
    zoneCourriel.setValue('test@hotmail.com');
    let zoneGroup = component.problemeForm.get('courrielGroup');
    let errors = zoneGroup.errors || {};
    expect(errors['Match']).toBeUndefined();
  });
  
  it('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier courriel', () => {
    component.appliquerNotifications('COURRIEL');
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneValidation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneValidation.setValue('test@hotmail.com');
    zoneCourriel.setValue('testtest@hotmail.com');
    let zoneGroup = component.problemeForm.get('courrielGroup');
    let errors = zoneGroup.errors || {};
    expect(errors['Match']).toBeTruthy();
  });
  
  it('Zones ADRESSE COURRIEL avec valeur et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
   component.appliquerNotifications('COURRIEL');
    let zoneCourriel = component.problemeForm.get('courrielGroup.courriel');
    let zoneValidation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneValidation.setValue('test@hotmail.com');
    zoneCourriel.setValue('test@hotmail.com');
    let zoneGroup = component.problemeForm.get('courrielGroup');
    let errors = zoneGroup.errors || {};
    expect(errors['Match']).toBeUndefined();
  });

  // TP-14 | NOTIFIER TEXTE

  it('Zone TELEPHONE est activée quand notifier par message texte', () => {
    component.appliquerNotifications('TELEPHONE');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('TELEPHONE');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('TELEPHONE');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
    component.appliquerNotifications('TELEPHONE');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('');
    let errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
    component.appliquerNotifications('TELEPHONE');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('450662925e');
    let errors = zone.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('TELEPHONE');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('450662925');
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });

  it('Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('TELEPHONE');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('45066292521');
    let errors = zone.errors || {};
    expect(errors['maxlength']).toBeTruthy();
  });

  it('Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('TELEPHONE');
    let zone = component.problemeForm.get('telephone');
    zone.setValue('4506629252');
    expect(zone.valid).toBeTruthy();
  });

});
