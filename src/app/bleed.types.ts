export type BleedName = string;

export type Bleed = {
  name: BleedName;
  subBleeds: BleedName[];
};
