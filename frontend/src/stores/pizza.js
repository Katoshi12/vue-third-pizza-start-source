import { defineStore } from "pinia";
import { ingredientsQuantity } from "@/common/helpers/ingredients-quantity";
import { pizzaPrice } from "@/common/helpers/pizza-price";
import { useDataStore } from "@/stores/data";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    index: null,
    name: "",
    sauceId: 0,
    doughId: 0,
    sizeId: 0,
    ingredients: [],
  }),
  getters: {
    sauce: (state) => {
      const data = useDataStore();
      return data.sauces.find((i) => i.id === state.sauceId) ?? data.sauces[0];
    },
    dough: (state) => {
      const data = useDataStore();
      return data.doughs.find((i) => i.id === state.sauceId) ?? data.doughs[0];
    },
    size: (state) => {
      const data = useDataStore();
      return data.sizes.find((i) => i.id === state.sauceId) ?? data.sizes[0];
    },
    ingredientsExtended: (state) => {
      const data = useDataStore();
      const pizzaIngredientsIds = state.ingredients.map((i) => i.ingredientId);
      return data.ingredients
        .filter((i) => pizzaIngredientsIds.includes(i.id))
        .map((i, idx) => {
          return {
            ...i,
            quantity: state.ingredients[idx]?.quantity ?? 0,
          };
        });
    },
    price: (state) => {
      return pizzaPrice(state);
    },
    ingredientQuantities: (state) => {
      return ingredientsQuantity(state);
    },
  },
  actions: {},
});
