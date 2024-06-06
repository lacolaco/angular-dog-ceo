export type BreedName = string;

export type Breed = {
  name: BreedName;
  subBreeds: BreedName[];
};

export type SelectedBreed = {
  base: BreedName;
  sub?: BreedName;
};

export function compareSelectedBreed(
  a: SelectedBreed,
  b: SelectedBreed,
): boolean {
  return a.base === b.base && a.sub === b.sub;
}
