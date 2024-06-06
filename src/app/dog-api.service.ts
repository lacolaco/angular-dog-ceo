import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BleedsResponse, DogImagesResponse } from './api-types';
import { Bleed, SelectedBleed } from './bleed';

@Injectable({ providedIn: 'root' })
export class DogApi {
  readonly #http = inject(HttpClient);

  async getAllBreeds(): Promise<Bleed[]> {
    const { message } = await lastValueFrom(
      this.#http.get<BleedsResponse>('https://dog.ceo/api/breeds/list/all'),
    );
    return Object.entries(message).map(([name, subBleeds]) => {
      return { name, subBleeds } satisfies Bleed;
    });
  }

  async getRandomImages(breed: SelectedBleed, max: number): Promise<string[]> {
    const bleedKey = breed.sub ? `${breed.base}/${breed.sub}` : breed.base;
    const { message } = await lastValueFrom(
      this.#http.get<DogImagesResponse>(
        `https://dog.ceo/api/breed/${bleedKey}/images/random/${Math.max(1, max)}`,
      ),
    );
    return message;
  }
}
