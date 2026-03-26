import { create } from 'zustand';

interface AuthState {
    userName: string;
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;

}

export const useAuthStore = create<AuthState>((set) => ({
    userName: '',
    isAuthenticated: false, // Empezamos sin sesión
    login: () => set({ isAuthenticated: true }),
    logout: () => set({ isAuthenticated: false }),

}));