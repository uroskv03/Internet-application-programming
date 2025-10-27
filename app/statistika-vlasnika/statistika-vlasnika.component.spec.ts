import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistikaVlasnikaComponent } from './statistika-vlasnika.component';

describe('StatistikaVlasnikaComponent', () => {
  let component: StatistikaVlasnikaComponent;
  let fixture: ComponentFixture<StatistikaVlasnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatistikaVlasnikaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatistikaVlasnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
