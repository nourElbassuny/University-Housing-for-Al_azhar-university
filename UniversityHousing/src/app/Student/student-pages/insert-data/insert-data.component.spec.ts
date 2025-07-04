import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertDataComponent } from './insert-data.component';

describe('InsertDataComponent', () => {
  let component: InsertDataComponent;
  let fixture: ComponentFixture<InsertDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
