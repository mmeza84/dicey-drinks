import type { Ingredient } from "@/models/models";
import { create } from "zustand";

type ConfigurationState = {
  ingredients: Ingredient[];
  setIngredients: (ingredients: Ingredient[]) => void;
  addIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (id: number) => void;
};

const useConfigurationStore = create<ConfigurationState>((set) => ({
  ingredients: [],
  setIngredients: (ingredients) => set({ ingredients }),
  addIngredient: (ingredient: Ingredient) =>
    set((state) => ({
      ingredients: [...state.ingredients, ingredient],
    })),
  removeIngredient: (id: number) =>
    set((state) => ({
      ingredients: state.ingredients.filter(
        (ingredient) => ingredient.id !== id
      ),
    })),
}));

export default useConfigurationStore;
