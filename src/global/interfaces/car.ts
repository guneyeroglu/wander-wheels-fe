export interface ICar {
  id: string;
  brand: string;
  model: string;
  year: number;
  hourPrice: number;
  color: IColor;
  image: string;
  transmission: TTransmissionType;
  fuelType: TFuelType;
  seat: number;
  avaliable: boolean;
  createdDate: Date;
  updatedDate: Date;
}

interface IColor {
  text: TColor;
  hex: string;
}

export type TColor = 'grey' | 'black' | 'white';
export type TTransmissionType = 'Automatic' | 'Manual' | 'Hybrid';
export type TFuelType = 'Electric' | 'Petrol';
