import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealBoxComponent } from './meal-box.component';

describe('MealBoxComponent', () => {
  let component: MealBoxComponent;
  let fixture: ComponentFixture<MealBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
