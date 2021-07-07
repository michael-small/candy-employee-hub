import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineStatusArchiveComponent } from './line-status-archive.component';

describe('LineStatusArchiveComponent', () => {
  let component: LineStatusArchiveComponent;
  let fixture: ComponentFixture<LineStatusArchiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineStatusArchiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineStatusArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
