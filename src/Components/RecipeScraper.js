import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Divider, Grid, Link, List, ListItem, ListItemText, Stack, TextField, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {addToShoppingList, changeRecipe, changeRecipeUrl} from "../Slices/RecipeScraperSlice";

function RecipeScraper() {
    const recipe = useSelector(state => state.recipeScraper)
    const dispatch = useDispatch()
    const [inputUrl, setInputUrl] = useState(recipe.recipeUrl);

    useEffect(() => {
        const fetchIngredients = async () => {
            const response = await axios.get(`http://localhost:8000/scrape?url=${inputUrl}`)
            // setRecipe(response.data)
            let responseRecipe = {...recipe, recipe: response.data, recipeUrl: response.data.url}

            dispatch(changeRecipe(responseRecipe, recipe))
            setInputUrl(recipe.recipeUrl)
        }

        fetchIngredients()
    }, [recipe.recipeUrl]);


    const handleInputChange = (e) => {
        setInputUrl(e.target.value)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        let payload = {...recipe, recipeUrl: inputUrl}

        dispatch(changeRecipeUrl(payload, recipe))
    }


    const handleAdd = () => {
        for(let arr in recipe.shoppingList) {
            if(recipe.recipe.url === recipe.shoppingList[arr]["url"]) {
                return
            }
        }
        const recipeToAdd = {"url": recipe.recipe.url, "ingredients": recipe.recipe.ingredients}
        dispatch(addToShoppingList(recipe, recipeToAdd))
    }


    return (
        <Grid container alignSelf={"center"} justify={"center"} direction={"row"} gap={2} paddingTop={"0.5em"}>
            <Grid item lg>
                <form onSubmit={handleSubmit}>
                    <Stack direction={"row"}>
                        <TextField id={"recipe-url-input"}
                                   name={"recipe-url"}
                                   label={"Recipe URL"}
                                   type={"text"}
                                   value={inputUrl}
                                   onChange={handleInputChange}
                                   fullWidth={true}
                        />
                        <Button variant={"outlined"} sx={{width: "20%"}} type={"submit"}>Submit</Button>
                    </Stack>
                </form>

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
                        return list["ingredients"].map((item) => {
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