import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilVlasnikaComponent } from './profil-vlasnika.component';

describe('ProfilVlasnikaComponent', () => {
  let component: ProfilVlasnikaComponent;
  let fixture: ComponentFixture<ProfilVlasnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilVlasnikaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilVlasnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
