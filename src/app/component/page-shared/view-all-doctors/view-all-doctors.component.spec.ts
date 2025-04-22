import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllDoctorsComponent } from './view-all-doctors.component';

describe('ViewAllDoctorsComponent', () => {
  let component: ViewAllDoctorsComponent;
  let fixture: ComponentFixture<ViewAllDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAllDoctorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
