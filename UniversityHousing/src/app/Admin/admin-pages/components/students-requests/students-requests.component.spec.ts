import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsRequestsComponent } from './students-requests.component';

describe('StudentsRequestsComponent', () => {
  let component: StudentsRequestsComponent;
  let fixture: ComponentFixture<StudentsRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentsRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentsRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
