export enum FuelType {
  Petrol = 0,
  Hybrid = 1,
  Diesel = 2,
  LPG = 3,
}

export enum BodyType {
  Hatchback = 0,
  Sedan = 1,
  Kombi = 2,
  SUV = 3,
  Roadster = 4,
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  doorsNumber: number;
  luggageCapacity: number;
  engineCapacity: number;
  fuelType: FuelType;
  productionDate: string; // ISO string
  carFuelConsumption: number;
  bodyType: BodyType;
}
