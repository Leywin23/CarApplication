export enum FuelType {
  Petrol = 0,
  Hybrid = 1,
  Diesel = 2,
  LPG = 3
}

export enum BodyType {
  Hatchback = 0,
  Sedan = 1,
  Kombi = 2,
  SUV = 3,
  Roadster = 4
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  doorsNumber: number;
  luggageCapacity: number;
  engineCapacity: number;
  fuelType: FuelType;
  productionDate: string; 
  carFuelConsumption: number;
  bodyType: BodyType;
}

export interface CreateCarDto {
  brand: string;
  model: string;
  doorsNumber: number;
  luggageCapacity: number;
  engineCapacity: number;
  fuelType: FuelType;
  productionDate: string;
  carFuelConsumption: number;
  bodyType: BodyType;
}
export interface UpdateCarPayload {
  id: string;
  brand: string;
  model: string;
  doorsNumber: number;
  luggageCapacity: number;
  engineCapacity: number;
  fuelType: FuelType;
  productionDate: string;
  carFuelConsumption: number;
  bodyType: BodyType;
}

export interface UpdateCarDto {
  car: UpdateCarPayload;
}