export type BleedName = string;

export type Bleed = {
  name: BleedName;
  subBleeds: BleedName[];
};

export type SelectedBleed = {
  base: BleedName;
  sub?: BleedName;
};

export function compareSelectedBleed(
  a: SelectedBleed,
  b: SelectedBleed,
): boolean {
  return a.base === b.base && a.sub === b.sub;
}
