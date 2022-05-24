import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentatorEditorComponent } from './presentator-editor.component';

describe('PresentatorEditorComponent', () => {
  let component: PresentatorEditorComponent;
  let fixture: ComponentFixture<PresentatorEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentatorEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentatorEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
