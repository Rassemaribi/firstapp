import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibleComponent } from './visible.component';

describe('VisibleComponent', () => {
  let component: VisibleComponent;
  let fixture: ComponentFixture<VisibleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisibleComponent]
    });
    fixture = TestBed.createComponent(VisibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
