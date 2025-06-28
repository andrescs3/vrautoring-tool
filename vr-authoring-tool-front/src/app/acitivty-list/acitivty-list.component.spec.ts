import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcitivtyListComponent } from './acitivty-list.component';

describe('AcitivtyListComponent', () => {
  let component: AcitivtyListComponent;
  let fixture: ComponentFixture<AcitivtyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcitivtyListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcitivtyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
