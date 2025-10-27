import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervacijeTuristeComponent } from './rezervacije-turiste.component';

describe('RezervacijeTuristeComponent', () => {
  let component: RezervacijeTuristeComponent;
  let fixture: ComponentFixture<RezervacijeTuristeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RezervacijeTuristeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RezervacijeTuristeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
