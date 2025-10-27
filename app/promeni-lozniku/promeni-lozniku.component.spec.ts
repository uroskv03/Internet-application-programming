import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromeniLoznikuComponent } from './promeni-lozniku.component';

describe('PromeniLoznikuComponent', () => {
  let component: PromeniLoznikuComponent;
  let fixture: ComponentFixture<PromeniLoznikuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromeniLoznikuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromeniLoznikuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
