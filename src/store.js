import { configureStore } from "@reduxjs/toolkit";
import recipeScraperReducer from "./Slices/RecipeScraperSlice"


export const store = configureStore({
    reducer: {
        recipeScraper: recipeScraperReducer
    },
})