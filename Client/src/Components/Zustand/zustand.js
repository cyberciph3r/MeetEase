import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => {
      return {
        user: null,
        login: (user_info) => {
          set((state) => {
            return { user: user_info };
          });
        },
        logout: () => {
          set((state) => {
            return { user: null };
          });
        },
      };
    },
    { name: "user-store" }
  )
);

export default useStore;
