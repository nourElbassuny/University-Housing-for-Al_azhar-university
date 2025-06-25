import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentHolidaysComponent } from './student-holidays.component';

describe('StudentHolidaysComponent', () => {
  let component: StudentHolidaysComponent;
  let fixture: ComponentFixture<StudentHolidaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentHolidaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
