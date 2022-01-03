import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarkItemComponent } from './landmark-item.component';

describe('LandmarkItemComponent', () => {
  let component: LandmarkItemComponent;
  let fixture: ComponentFixture<LandmarkItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandmarkItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmarkItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
