import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentatorActivityComponent } from './presentator-activity.component';

describe('PresentatorActivityComponent', () => {
  let component: PresentatorActivityComponent;
  let fixture: ComponentFixture<PresentatorActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentatorActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentatorActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
