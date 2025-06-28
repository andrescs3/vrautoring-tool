import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcentrationActivityComponent } from './concentration-activity.component';

describe('ConcentrationActivityComponent', () => {
  let component: ConcentrationActivityComponent;
  let fixture: ComponentFixture<ConcentrationActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcentrationActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcentrationActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
