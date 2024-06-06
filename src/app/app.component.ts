import {
  Component,
  OnInit,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { Breed, SelectedBreed } from './breed';
import { BreedSelectorComponent } from './breed-selector/breed-selector.component';
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
    BreedSelectorComponent,
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
export class AppComponent implements OnInit {
  readonly #dogApi = inject(DogApi);

  readonly breeds = signal<Breed[]>([]);
  readonly images = signal<ImageItem[]>([]);
  readonly selectedBreed = signal<SelectedBreed | null>(null);

  readonly fetchImagesOnBeeedSelect = effect(() => {
    const selectedBreed = this.selectedBreed();
    if (!selectedBreed) return;

    untracked(() => {
      this.#fetchDogImages(selectedBreed);
    });
  });

  ngOnInit() {
    this.#fetchAllBreeds();
  }

  selectRandomBreed() {
    const breeds = this.breeds();
    if (breeds.length === 0) return;

    const breed = breeds.at(Math.floor(Math.random() * breeds.length))!;
    if (breed.subBreeds.length === 0) {
      this.selectedBreed.set({ base: breed.name });
    } else {
      const sub = breed.subBreeds.at(
        Math.floor(Math.random() * breed.subBreeds.length),
      )!;
      this.selectedBreed.set({ base: breed.name, sub });
    }
  }

  refreshImages() {
    const selectedBreed = this.selectedBreed();
    if (!selectedBreed) return;

    this.#fetchDogImages(selectedBreed);
  }

  #fetchAllBreeds() {
    this.#dogApi.getAllBreeds().then((breeds) => {
      this.breeds.set(breeds);
      this.selectedBreed.set({ base: breeds[0].name });
    });
  }

  #fetchDogImages(breed: SelectedBreed) {
    this.#dogApi.getRandomImages(breed, 3).then((images) => {
      this.images.set(images.map((src) => ({ src, alt: `A dog image` })));
    });
  }
}
