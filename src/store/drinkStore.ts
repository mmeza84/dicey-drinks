import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type DrinkType = "cocktail" | "shot" | "";
export type IngredientType = "spirits" | "mixers" | "flair";

// Define the drink state as a type to simplify store/usage.
type DrinkBuilder = {
  drinkType: DrinkType;
  spiritCount: number;
  mixerCount: number;
  flairCount: number;
  ingredients: {
    spirits: string[];
    mixers: string[];
    flair: string[];
  };
};

interface DrinkState {
  drink: DrinkBuilder;
  drinkRollStep: number;
  setDrinkRollStep: (step: number) => void;
  setDrinkType: (type: DrinkType) => void;
  setSpiritCount: (count: number) => void;
  setMixerCount: (count: number) => void;
  setFlairCount: (count: number) => void;
  addIngredient: (type: IngredientType, value: string) => void;
  removeIngredient: (type: IngredientType, value: string) => void;
  resetDrink: () => void;
}

const useDrinkStore = create<DrinkState>()(
  persist(
    (set) => ({
      drinkRollStep: 1,
      drink: {
        drinkType: "",
        spiritCount: 0,
        mixerCount: 0,
        flairCount: 0,
        ingredients: {
          spirits: [],
          mixers: [],
          flair: [],
        },
      } as DrinkBuilder,
      setDrinkRollStep: (step: number) => set({ drinkRollStep: step }),
      setDrinkType: (type) =>
        set((state) => ({ drink: { ...state.drink, drinkType: type } })),
      setSpiritCount: (count) =>
        set((state) => ({ drink: { ...state.drink, spiritCount: count } })),
      setMixerCount: (count) =>
        set((state) => ({ drink: { ...state.drink, mixerCount: count } })),
      setFlairCount: (count) =>
        set((state) => ({ drink: { ...state.drink, flairCount: count } })),
      addIngredient: (type: IngredientType, value: string) => {
        if (!value) return;
        set((state) => {
          const newIngredients = { ...state.drink.ingredients };
          newIngredients[type] = [...newIngredients[type], value];
          return { drink: { ...state.drink, ingredients: newIngredients } };
        });
      },
      removeIngredient: (type: IngredientType, value: string) => {
        set((state) => {
          const newIngredients = { ...state.drink.ingredients };
          newIngredients[type] = newIngredients[type].filter(
            (item) => item !== value
          );
          return { drink: { ...state.drink, ingredients: newIngredients } };
        });
      },
      resetDrink: () => {
        set(() => {
          return {
            drink: {
              drinkType: "",
              spiritCount: 0,
              mixerCount: 0,
              flairCount: 0,
              ingredients: {
                spirits: [],
                mixers: [],
                flair: [],
              },
            },
            drinkRollStep: 1,
          };
        });
      },
    }),
    {
      name: "dicey-drink-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useDrinkStore;
