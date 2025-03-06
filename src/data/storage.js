import { create } from 'zustand'

export const useScore = create((set) => ({
    score: 0,
    increaseScore: () => set((state) => ({ score: state.score + 1 })),
    resetScore: () => set({ score: 0 }),
}))
export const useCargo = create((set, get) => ({
    cargo: 0,
    cargoLimit: 3,
    isCargoLimitReached: () => {
        const state = get();
        return state.cargo === state.cargoLimit;
    },
    increaseCargo: () => set((state) => ({ cargo: state.cargo + 1 })),
    resetCargo: () => set({ cargo: 0 }),
    increaseCargoLimit: (IncreaseAmount) => set((state) => ({ cargoLimit: state.cargoLimit + IncreaseAmount }))
}))

