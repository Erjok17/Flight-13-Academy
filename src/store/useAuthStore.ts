import { create } from 'zustand';
import { CentralEngine, type UserProfile } from '../db';

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  initialize: () => Promise<void>;
  setLogin: (user: UserProfile, token: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfileState: (profile: UserProfile) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoggedIn: false,
  isLoading: true,

  initialize: async () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      set({ user: null, token: null, isLoggedIn: false, isLoading: false });
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      // Optimistic load from local Dexie DB
      const cachedProfile = await CentralEngine.getProfileLocal(parsedUser.id);
      const activeUser = cachedProfile || CentralEngine.mapToFrontend(parsedUser);

      set({
        user: activeUser,
        token,
        isLoggedIn: true,
        isLoading: false
      });

      // Background network sync
      const freshProfile = await CentralEngine.syncProfileFromBackend(token);
      if (freshProfile) {
        set({ user: freshProfile });
      }
    } catch (e) {
      console.error('Failed to initialize auth store:', e);
      set({ isLoading: false });
    }
  },

  setLogin: async (user, token) => {
    localStorage.setItem('token', token);
    const activeProfile = CentralEngine.mapToFrontend(user);
    await CentralEngine.saveProfileLocal(activeProfile);

    set({
      user: activeProfile,
      token,
      isLoggedIn: true
    });
  },

  logout: async () => {
    const { token } = get();
    if (token) {
      try {
        // Optional backend signout check
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (e) {
        console.warn('Backend logout call failed, clearing local state anyway.');
      }
    }

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    set({
      user: null,
      token: null,
      isLoggedIn: false
    });
  },

  updateProfileState: async (profile) => {
    const { token } = get();
    if (!token) return;

    // Trigger local update and background sync
    await CentralEngine.updateProfile(profile, token);
    set({ user: profile });
  }
}));
