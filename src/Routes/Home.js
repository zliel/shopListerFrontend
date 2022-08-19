import React from 'react';
import {Box, Typography} from "@mui/material";
import RecipeScraper from "../Components/RecipeScraper";

function Home(props) {
    return (
        <Box>
            <RecipeScraper />
            <Typography variant={"h6"}>Hello!</Typography>
        </Box>
    );
}

export default Home;