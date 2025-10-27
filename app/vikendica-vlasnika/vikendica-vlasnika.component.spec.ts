import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VikendicaVlasnikaComponent } from './vikendica-vlasnika.component';

describe('VikendicaVlasnikaComponent', () => {
  let component: VikendicaVlasnikaComponent;
  let fixture: ComponentFixture<VikendicaVlasnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VikendicaVlasnikaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VikendicaVlasnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
