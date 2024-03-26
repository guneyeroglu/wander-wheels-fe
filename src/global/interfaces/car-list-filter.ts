export interface ICarFilter {
  brands: Nullable<string>;
  models: Nullable<string>;
  transmissionTypes: Nullable<string>;
  fuelTypes: Nullable<string>;
  minPrice: Nullable<number>;
  maxPrice: Nullable<number>;
  minYear: Nullable<number>;
  maxYear: Nullable<number>;
  seat: Nullable<number>;
  colors: Nullable<string[]>;
}
