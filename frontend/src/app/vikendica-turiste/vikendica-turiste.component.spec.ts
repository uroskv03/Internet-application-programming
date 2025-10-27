import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VikendicaTuristeComponent } from './vikendica-turiste.component';

describe('VikendicaTuristeComponent', () => {
  let component: VikendicaTuristeComponent;
  let fixture: ComponentFixture<VikendicaTuristeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VikendicaTuristeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VikendicaTuristeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
