import {
    GET_TYPEOFFEGGS,
    GET_RECIPES,
    GET_CATEGORIES,
    GET_INGREDIENTS,
    GET_SEARCHED_RECIPES,
} from '../actions/App';

const initialState = {
    typeOffEggs: [],
    recipes: [],
    searchedRecipes: [],
    categories: [],
    ingredients: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TYPEOFFEGGS:
            const fetchedTypeOffEggs = [...action.typeOffEggs];
            return {
                ...state,
                typeOffEggs: fetchedTypeOffEggs,
            };
        case GET_RECIPES:
            const fetchedRecipes = [...action.recipes];
            return {
                ...state,
                recipes: fetchedRecipes,
            };
        case GET_SEARCHED_RECIPES:
            const fetchedSearchedRecipes = [...action.searchedRecipes];
            return {
                ...state,
                searchedRecipes: fetchedSearchedRecipes,
            };
        case GET_CATEGORIES:
            const fetchedCategories = [...action.categories];
            return {
                ...state,
                categories: fetchedCategories,
            };
        case GET_INGREDIENTS:
            const fetchedIngredients = action.ingredients;
            return {
                ...state,
                ingredients: fetchedIngredients,
            };
        default:
            return state;
    }
};
