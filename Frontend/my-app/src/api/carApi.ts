import api from "./axios";
import type { Car } from "../models/car";

export const carsApi = {
  list: async (): Promise<Car[]> => {
    const { data } = await api.get<Car[]>("/Cars");
    return data;
  },
  details: async (id: string): Promise<Car> => {
    const { data } = await api.get<Car>(`/Cars/${id}`);
    return data;
  },
  create: async (car: Car): Promise<Car> => {
    const { data } = await api.post<Car>("/Cars", { car });
    return data;
  },
  update: async (car: Car): Promise<Car> => {
    const { data } = await api.put<Car>("/Cars", { car });
    return data;
  },
  delete: async (id: string): Promise<Car> => {
    const { data } = await api.delete<Car>(`/Cars/${id}`);
    return data;
  },
};
