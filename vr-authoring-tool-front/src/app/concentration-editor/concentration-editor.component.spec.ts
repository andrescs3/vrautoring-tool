import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcentrationEditorComponent } from './concentration-editor.component';

describe('ConcentrationEditorComponent', () => {
  let component: ConcentrationEditorComponent;
  let fixture: ComponentFixture<ConcentrationEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcentrationEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcentrationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
