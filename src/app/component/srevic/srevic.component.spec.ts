import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrevicComponent } from './srevic.component';

describe('SrevicComponent', () => {
  let component: SrevicComponent;
  let fixture: ComponentFixture<SrevicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SrevicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SrevicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
