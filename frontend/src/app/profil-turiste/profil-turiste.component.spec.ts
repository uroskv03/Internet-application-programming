import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilTuristeComponent } from './profil-turiste.component';

describe('ProfilTuristeComponent', () => {
  let component: ProfilTuristeComponent;
  let fixture: ComponentFixture<ProfilTuristeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilTuristeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilTuristeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
