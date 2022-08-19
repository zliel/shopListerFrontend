import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    recipeUrl: "https://www.justonecookbook.com/tonkatsu/",
    recipe: {ingredients: ["2  boneless pork loin chops (½ inch thick)","½ tsp kosher salt (Diamond Crystal; use half for table salt)","⅛ tsp freshly ground black pepper","3 cups neutral-flavored oil (vegetable, rice bran, canola, etc.)","2 Tbsp all-purpose flour (plain flour)","1  large egg (50 g w/o shell)","½ Tbsp neutral-flavored oil (vegetable, rice bran, canola, etc.)","½ cup panko (Japanese breadcrumbs)","¼ head cabbage","1  Persian or Japanese cucumber","2 Tbsp Japanese sesame dressing","1 Tbsp toasted white sesame seeds","1 Tbsp toasted black sesame seeds","4 Tbsp tonkatsu sauce"], url: "https://www.justonecookbook.com/tonkatsu/"},
    shoppingList: []
}

export const recipeScraperSlice = createSlice({
    name: "recipeScraper",
    initialState,
    reducers: {
        changeRecipe: (state, action) => {
            state.recipe = action.payload.recipe
        },
        changeRecipeUrl: (state, action) => {
            state.recipeUrl = action.payload.recipeUrl

        },
        addToShoppingList: (state, action) => {
            state.shoppingList = [...state.shoppingList, action.payload.recipe.ingredients]
        }
    }
})

export const { changeRecipe, changeRecipeUrl, addToShoppingList } = recipeScraperSlice.actions

export default recipeScraperSlice.reducer