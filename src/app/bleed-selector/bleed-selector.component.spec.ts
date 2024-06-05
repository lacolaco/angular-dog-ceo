import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BleedSelectorComponent } from './bleed-selector.component';

describe('BleedSelectorComponent', () => {
  let component: BleedSelectorComponent;
  let fixture: ComponentFixture<BleedSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BleedSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BleedSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
