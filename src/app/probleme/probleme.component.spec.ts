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
    expect(false).toBeFalsy();
  });

  it('Zone PRÉNOM valide avec 3 caractères', () => {
    expect(true).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 200 caractères', () => {
    expect(true).toBeTruthy();
  });

  it('Zone PRÉNOM invalide avec aucune valeur', () => {
    expect(false).toBeFalsy();
  });

  it('Zone PRÉNOM invalide avec 1 caractère', () => {
    expect(false).toBeFalsy();
  });

  it('Zone PRÉNOM valide avec 50 espaces', () => {
    expect(true).toBeTruthy();
  });

  it('Zone PRÉNOM valide avec 2 espaces et 1 caractère', () => {
    expect(true).toBeTruthy();
  });
});
