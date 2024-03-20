export interface ICar {
  id: string;
  brand: string;
  model: string;
  year: number;
  dayPrice: number;
  color: IColor;
  images: {
    featured: string;
    others: string[];
  };
  transmission: IType<TransmissionType>;
  fuel: IType<FuelType>;
  seat: number;
  available: {
    status: boolean;
    date: Date;
  };
  createdDate: Date;
  updatedDate: Date;
}

export interface IColor {
  id: number;
  text: ColorType;
  code: string;
}

export interface IType<T> {
  id: number;
  type: T;
}

export type ColorType = 'Grey' | 'Black' | 'White';
export type TransmissionType = 'Automatic' | 'Manual' | 'Hybrid';
export type FuelType = 'Electric' | 'Petrol';
