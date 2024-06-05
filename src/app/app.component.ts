import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { BleedsResponse, DogImagesResponse } from './api.type';
import { Bleed } from './bleed.types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class AppComponent {
  readonly #http = inject(HttpClient);

  readonly bleeds = signal<Bleed[]>([]);
  readonly dogImages = signal<string[]>([]);
  readonly selectedBleed = signal<Bleed | null>(null);

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
        this.selectedBleed.set(bleeds[0]);
      });
  }

  #fetchDogImages(bleed: Bleed) {
    const bleedKey = bleed.name;

    this.#http
      .get<DogImagesResponse>(
        `https://dog.ceo/api/breed/${bleedKey}/images/random/3`,
      )
      .subscribe(({ message }) => {
        this.dogImages.set(message);
      });
  }
}
