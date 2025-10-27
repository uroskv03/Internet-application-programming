import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervacijeVlasnikaComponent } from './rezervacije-vlasnika.component';

describe('RezervacijeVlasnikaComponent', () => {
  let component: RezervacijeVlasnikaComponent;
  let fixture: ComponentFixture<RezervacijeVlasnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RezervacijeVlasnikaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RezervacijeVlasnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
