import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, signal, untracked } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { BleedsResponse, DogImagesResponse } from './api-types';
import { Bleed, SelectedBleed } from './bleed';
import { BleedSelectorComponent } from './bleed-selector/bleed-selector.component';
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
  readonly #http = inject(HttpClient);

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
    this.#http
      .get<BleedsResponse>('https://dog.ceo/api/breeds/list/all')
      .subscribe(({ message }) => {
        const bleeds = Object.entries(message).map(([name, subBleeds]) => {
          return { name, subBleeds } satisfies Bleed;
        });
        this.bleeds.set(bleeds);
        this.selectedBleed.set({ base: bleeds[0].name });
      });
  }

  #fetchDogImages(bleed: SelectedBleed) {
    const bleedKey = bleed.sub ? `${bleed.base}/${bleed.sub}` : bleed.base;

    this.#http
      .get<DogImagesResponse>(
        `https://dog.ceo/api/breed/${bleedKey}/images/random/4`,
      )
      .subscribe(({ message }) => {
        this.images.set(message.map((src) => ({ src, alt: `A dog image` })));
      });
  }
}
