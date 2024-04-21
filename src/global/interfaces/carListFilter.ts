import { IRentForm } from './rentForm';

export interface ICarFilter extends IRentForm {
  brandId: Nullable<number>;
  modelId: Nullable<number>;
  transmissionId: Nullable<number>;
  fuelId: Nullable<number>;
  minPrice: Nullable<number>;
  maxPrice: Nullable<number>;
  minYear: Nullable<number>;
  maxYear: Nullable<number>;
  seat: Nullable<number>;
  colorIds: Nullable<number[]>;
}
