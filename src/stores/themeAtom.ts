import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ChangeableTheme = {
    theme: 'cupcake' | 'sunset';
    toggle: () => void;
}
export const useChangeableTheme = create(persist<ChangeableTheme>(
    (set, get) => ({
        theme: 'cupcake',
        toggle: () => set({ theme: get().theme === 'cupcake' ? 'sunset' : 'cupcake' }),
    }), {
        name: 'theme',
        storage: createJSONStorage(() => localStorage),
    }
));
