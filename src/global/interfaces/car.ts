export interface ICar {
  id: string;
  brand: string;
  model: string;
  year: number;
  hourPrice: number;
  color: IColor;
  image: string;
  transmission: TransmissionType;
  fuelType: FuelType;
  seat: number;
  avaliable: boolean;
  createdDate: Date;
  updatedDate: Date;
}

interface IColor {
  text: ColorType;
  hex: string;
}

export type ColorType = 'grey' | 'black' | 'white';
export type TransmissionType = 'Automatic' | 'Manual' | 'Hybrid';
export type FuelType = 'Electric' | 'Petrol';
