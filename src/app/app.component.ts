import { Component, effect, inject, signal, untracked } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { Bleed, SelectedBleed } from './bleed';
import { BleedSelectorComponent } from './bleed-selector/bleed-selector.component';
import { DogApi } from './dog-api.service';
import {
  ImageItem,
  ImagesViewerComponent,
} from './images-viewer/images-viewer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    BleedSelectorComponent,
    MatButton,
    ImagesViewerComponent,
  ],
  templateUrl: './app.component.html',
  styles: `
    :host {
      display: block;
      height: 100%;
    }
  `,
})
export class AppComponent {
  readonly #dogApi = inject(DogApi);

  readonly bleeds = signal<Bleed[]>([]);
  readonly images = signal<ImageItem[]>([]);
  readonly selectedBleed = signal<SelectedBleed | null>(null);

  readonly onBleedSelect = effect(() => {
    const selectedBleed = this.selectedBleed();
    if (!selectedBleed) return;

    untracked(() => {
      this.#fetchDogImages(selectedBleed);
    });
  });

  ngOnInit() {
    this.#fetchAllBleeds();
  }

  refreshImages() {
    const selectedBleed = this.selectedBleed();
    if (!selectedBleed) return;

    this.#fetchDogImages(selectedBleed);
  }

  #fetchAllBleeds() {
    this.#dogApi.getAllBreeds().then((bleeds) => {
      this.bleeds.set(bleeds);
      this.selectedBleed.set({ base: bleeds[0].name });
    });
  }

  #fetchDogImages(bleed: SelectedBleed) {
    this.#dogApi.getRandomImages(bleed, 3).then((images) => {
      this.images.set(images.map((src) => ({ src, alt: `A dog image` })));
    });
  }
}
