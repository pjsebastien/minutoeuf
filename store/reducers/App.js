import { GET_TYPEOFFEGGS, GET_RECIPES, GET_CATEGORIES } from '../actions/App';

const initialState = {
    typeOffEggs: [],
    recipes: [],
    categories: [],
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
        case GET_CATEGORIES:
            const fetchedCategories = [...action.categories];
            return {
                ...state,
                categories: fetchedCategories,
            };
        default:
            return state;
    }
};
