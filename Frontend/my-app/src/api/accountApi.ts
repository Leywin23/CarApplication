import api from "./axios";
import type { LoginDto, RegisterDto, UserDto } from "../models/account";

export const accountApi = {
  login: async (payload: LoginDto): Promise<UserDto> => {
    const { data } = await api.post<UserDto>("/Account/login", payload);
    return data;
  },
  register: async (payload: RegisterDto): Promise<UserDto> => {
    const { data } = await api.post<UserDto>("/Account/register", payload);
    return data;
  },
  current: async (): Promise<UserDto> => {
    const { data } = await api.get<UserDto>("/Account"); // [Authorize]
    return data;
  },
};
