import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarksSectionComponent } from './landmarks-section.component';

describe('LandmarksSectionComponent', () => {
  let component: LandmarksSectionComponent;
  let fixture: ComponentFixture<LandmarksSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandmarksSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmarksSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
