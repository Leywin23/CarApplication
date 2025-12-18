import type { LoginDto, RegisterDto, UserDto } from "../models/account";
import { accountApi } from "../api/accountApi";

type AuthState = {
  user: UserDto | null;
};

const state: AuthState = {
  user: null,
};

export const authStore = {
  get user() {
    return state.user;
  },

  setUser(user: UserDto | null) {
    state.user = user;
    if (user?.token) localStorage.setItem("token", user.token);
    else localStorage.removeItem("token");
  },

  login: async (dto: LoginDto) => {
    const user = await accountApi.login(dto);
    authStore.setUser(user);
    return user;
  },

  register: async (dto: RegisterDto) => {
    const user = await accountApi.register(dto);
    authStore.setUser(user);
    return user;
  },

  loadCurrentUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const user = await accountApi.current();
    authStore.setUser(user);
    return user;
  },

  logout: () => {
    authStore.setUser(null);
  },
};
