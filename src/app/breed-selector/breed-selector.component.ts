import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Breed, SelectedBreed, compareSelectedBreed } from '../breed';

@Component({
  selector: 'app-breed-selector',
  standalone: true,
  imports: [FormsModule, MatSelectModule],
  templateUrl: './breed-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class BreedSelectorComponent {
  readonly breeds = input.required<Breed[]>();
  readonly selectedBreed = model.required<SelectedBreed | null>();

  readonly compareSelectedBreed = compareSelectedBreed;
}
