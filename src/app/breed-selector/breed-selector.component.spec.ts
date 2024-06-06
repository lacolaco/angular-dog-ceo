import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedSelectorComponent } from './breed-selector.component';

describe('BreedSelectorComponent', () => {
  let component: BreedSelectorComponent;
  let fixture: ComponentFixture<BreedSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BreedSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
