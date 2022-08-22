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

            // Because the JOC website autocompletes incomplete urls to the closest recipes,
            // we need to change the recipeUrl here to match what comes back as the final url
            // from the api
            if(state.recipeUrl !== action.payload.recipeUrl) state.recipeUrl = action.payload.recipeUrl
        },
        changeRecipeUrl: (state, action) => {
            state.recipeUrl = action.payload.recipeUrl

        },
        addToShoppingList: (state, action) => {
            state.shoppingList = [...state.shoppingList, action.payload.recipe]
        }
    }
})

export const { changeRecipe, changeRecipeUrl, addToShoppingList } = recipeScraperSlice.actions

export default recipeScraperSlice.reducer