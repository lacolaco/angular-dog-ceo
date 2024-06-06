import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { BreedsResponse, DogImagesResponse } from './api-types';
import { Breed, SelectedBreed } from './breed';

@Injectable({ providedIn: 'root' })
export class DogApi {
  readonly #http = inject(HttpClient);

  async getAllBreeds(): Promise<Breed[]> {
    const { message } = await lastValueFrom(
      this.#http.get<BreedsResponse>('https://dog.ceo/api/breeds/list/all'),
    );
    return Object.entries(message).map(([name, subBreeds]) => {
      return { name, subBreeds } satisfies Breed;
    });
  }

  async getRandomImages(breed: SelectedBreed, max: number): Promise<string[]> {
    const breedKey = breed.sub ? `${breed.base}/${breed.sub}` : breed.base;
    const { message } = await lastValueFrom(
      this.#http.get<DogImagesResponse>(
        `https://dog.ceo/api/breed/${breedKey}/images/random/${Math.max(1, max)}`,
      ),
    );
    return message;
  }
}
