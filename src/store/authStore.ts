import { create } from 'zustand';
import type { User } from '@/types';
import { initialsOf } from '@/utils/format';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isFirstTimeUser: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<Pick<User, 'name' | 'email' | 'company'>>) => void;
  clearError: () => void;
  setFirstTimeUser: (val: boolean) => void;
}

const STORAGE_KEY = 'nimbus-crm-auth';
const FIRST_VISIT_KEY = 'nimbus-crm-first-visit';

function loadStoredUser(): User | null {
  try {
    const fromLocal = localStorage.getItem(STORAGE_KEY);
    const fromSession = sessionStorage.getItem(STORAGE_KEY);
    const raw = fromLocal ?? fromSession;
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function persistUser(user: User, rememberMe: boolean) {
  const payload = JSON.stringify(user);
  if (rememberMe) {
    localStorage.setItem(STORAGE_KEY, payload);
  } else {
    sessionStorage.setItem(STORAGE_KEY, payload);
  }
}

export const useAuthStore = create<AuthState>((set) => {
  const storedUser = loadStoredUser();
  // isFirstTimeUser: true if the site has never been visited before
  const hasVisited = localStorage.getItem(FIRST_VISIT_KEY);
  const isFirstTimeUser = !hasVisited;

  return {
    user: storedUser,
    isAuthenticated: !!storedUser,
    isLoading: false,
    error: null,
    isFirstTimeUser,

    setFirstTimeUser: (val) => set({ isFirstTimeUser: val }),

    login: async (email, password, rememberMe) => {
      set({ isLoading: true, error: null });

      // Simulated network round-trip against a mock auth API.
      await new Promise((resolve) => setTimeout(resolve, 900));

      if (password.length < 6) {
        set({ isLoading: false, error: 'Incorrect email or password. Please try again.' });
        return;
      }

      // Check if custom account exists
      const savedUserStr = localStorage.getItem(`nimbus-registered-${email}`);
      let user: User;

      if (savedUserStr) {
        const savedData = JSON.parse(savedUserStr);
        if (savedData.password !== password) {
          set({ isLoading: false, error: 'Password or email is invalid.' });
          return;
        }
        user = {
          id: savedData.id,
          name: savedData.name,
          email: savedData.email,
          role: savedData.role,
          avatarInitials: savedData.avatarInitials,
          company: savedData.company,
          joinedAt: savedData.joinedAt,
        };
      } else {
        set({ isLoading: false, error: 'You need to create an account before signing in.' });
        return;
      }

      persistUser(user, rememberMe);
      localStorage.setItem(FIRST_VISIT_KEY, 'true');
      set({ user, isAuthenticated: true, isLoading: false, error: null, isFirstTimeUser: false });
    },

    signup: async (name, email, password) => {
      set({ isLoading: true, error: null });

      // Simulated network round-trip
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (password.length < 6) {
        set({ isLoading: false, error: 'Password must be at least 6 characters.' });
        return;
      }

      if (!name.trim()) {
        set({ isLoading: false, error: 'Profile name is required.' });
        return;
      }

      // To verify on login, we persist the registration in memory or mock localStorage
      const registrationPayload = JSON.stringify({
        id: `USR-${Date.now()}`,
        name: name.trim(),
        email,
        role: 'Sales Rep' as const,
        avatarInitials: initialsOf(name.trim()),
        company: 'Nimbus CRM',
        joinedAt: new Date().toISOString().split('T')[0],
        password // store password for verification check on login page
      });
      localStorage.setItem(`nimbus-registered-${email}`, registrationPayload);

      localStorage.setItem(FIRST_VISIT_KEY, 'true');
      set({ isLoading: false, error: null });
    },

    logout: () => {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
      set({ user: null, isAuthenticated: false });
    },

    updateProfile: (updates) => {
      set((state) => {
        if (!state.user) return state;
        const updatedUser = { ...state.user, ...updates };
        if (localStorage.getItem(STORAGE_KEY)) persistUser(updatedUser, true);
        else if (sessionStorage.getItem(STORAGE_KEY)) persistUser(updatedUser, false);
        return { user: updatedUser };
      });
    },

    clearError: () => set({ error: null }),
  };
});
