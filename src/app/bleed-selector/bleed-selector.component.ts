import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Bleed, SelectedBleed, compareSelectedBleed } from '../bleed';

@Component({
  selector: 'app-bleed-selector',
  standalone: true,
  imports: [FormsModule, MatSelectModule],
  templateUrl: './bleed-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class BleedSelectorComponent {
  readonly bleeds = input.required<Bleed[]>();
  readonly selectedBleed = model.required<SelectedBleed | null>();

  readonly compareSelectedBleed = compareSelectedBleed;
}
