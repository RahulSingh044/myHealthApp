import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUserStore = create(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      clearUser: () => set({ currentUser: null }),
    }),
    { name: 'user-storage' }
  )
);

export default useUserStore;
