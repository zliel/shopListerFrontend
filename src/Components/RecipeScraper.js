import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Divider, Grid, Link, List, ListItem, ListItemText, TextField, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {addToShoppingList, changeRecipe, changeRecipeUrl} from "../Slices/RecipeScraperSlice";

function RecipeScraper() {
    const recipe = useSelector(state => state.recipeScraper)
    const recipeUrl = useSelector((state) => state.recipeScraper.recipeUrl)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchIngredients = async () => {
            const response = await axios.get(`http://localhost:8000/scrape?url=${recipe.recipeUrl}`)
            // setRecipe(response.data)
            let responseRecipe = {...recipe, recipe: response.data}

            dispatch(changeRecipe(responseRecipe, recipe))
        }

        fetchIngredients()
    }, [recipeUrl]);

    const handleInputChange = (e) => {
        let payload = {...recipe, recipeUrl: e.target.value}

        dispatch(changeRecipeUrl(payload, recipe))
        // setRecipeUrl(e.target.value)
    }

    const handleAdd = () => {
        for(let arr in recipe.shoppingList) {
            if(recipe.recipe.ingredients === recipe.shoppingList[arr]) {
                return
            }
        }

        dispatch(addToShoppingList(recipe, recipe.recipe.ingredients))
        // setShoppingList([...shoppingList, recipe.ingredients])
    }

    return (
        <Grid container alignSelf={"center"} justify={"center"} direction={"row"} gap={2} paddingTop={"0.5em"}>
            <Grid item md>
                <TextField id={"recipe-url-input"}
                           name={"recipe-url"}
                           label={"Recipe URL"}
                           type={"text"}
                           value={recipe.recipeUrl}
                           onChange={handleInputChange}
                           fullWidth={true}
                />
                <Typography variant={"h6"} color={"primary"}>Ingredients</Typography>
                <List sx={{height: "auto", maxHeight: "60%", overflow: "auto"}}>
                    {recipe.recipe.ingredients.map((ingredient) => {
                        return <><ListItem>
                            <ListItemText primary={ingredient} key={ingredient}/>
                        </ListItem>
                        <Divider variant={"middle"} />
                        </>
                    })}
                </List>
                <Typography variant={"h6"}>URL: <Link href={recipe.recipeUrl} target={"_blank"}>{recipe.recipeUrl}</Link></Typography>
                <Button variant={"outlined"} onClick={handleAdd}><Add /> Add to shopping list</Button>
            </Grid>
            <Grid item md>

                <Typography variant={"h6"} color={"primary"}>Shopping List</Typography>
                <List sx={{height: "auto", maxHeight: "50%", overflow: "auto"}}>
                    {recipe.shoppingList.map((list) => {
                        return list.map((item) => {
                            return <>
                                <ListItem>
                                    <ListItemText primary={item} key={item}/>
                                </ListItem>
                                <Divider variant={"middle"} />
                            </>
                        })
                    })}
                </List>
            </Grid>
        </Grid>
    );
}

export default RecipeScraper;