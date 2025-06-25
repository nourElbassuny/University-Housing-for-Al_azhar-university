import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSetingsComponent } from './student-setings.component';

describe('StudentSetingsComponent', () => {
  let component: StudentSetingsComponent;
  let fixture: ComponentFixture<StudentSetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentSetingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
