import { BreedName } from './breed';

export type DogsApiResponse<T> = {
  message: T;
  status: string;
};

export type BreedsResponse = DogsApiResponse<Record<BreedName, BreedName[]>>;

export type DogImagesResponse = DogsApiResponse<string[]>;
