import axios from "axios";
import { Car, CreateCarDto, UpdateCarDto } from "./types";

const api = axios.create({
  baseURL: "https://localhost:7036/api",
});

export const GetAllCars = async (): Promise<Car[]> => {
  const response = await api.get<Car[]>("/cars");
  return response.data;
};

export const GetCarById = async (id: string): Promise<Car | null> => {
  try {
    const response = await api.get<Car>(`/cars/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) return null;
    throw error;
  }
};

export const CreateCar = async (car: CreateCarDto): Promise<Car> => {
  const response = await api.post<Car>("/cars", car);
  return response.data;
};


export const UpdateCar = async (dto: UpdateCarDto): Promise<Car> => {
  const response = await api.put<Car>("/cars", dto);
  return response.data;
};


export const DeleteCar = async (id: string): Promise<void> => {
  await api.delete(`/cars/${id}`);
};
