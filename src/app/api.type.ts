import { BleedName } from './bleed.types';

export type DogsApiResponse<T> = {
  message: T;
  status: string;
};

export type BleedsResponse = DogsApiResponse<Record<BleedName, BleedName[]>>;

export type DogImagesResponse = DogsApiResponse<string[]>;
