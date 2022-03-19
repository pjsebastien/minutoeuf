import axios from '../../axios-instance';

export const GET_TYPEOFFEGGS = 'GET_TYPEOFFEGGS';
export const GET_RECIPES = 'GET_RECIPES';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_SEARCHED_RECIPES = 'GET_SEARCHED_RECIPES';

export const getTypeOffEggs = () => {
    return dispatch => {
        axios
            .get(`/type-off-eggs?populate=*`)
            .then(response => {
                const fetchedTypeOffEggs = [];
                for (let key in response.data.data) {
                    const queryPrefix = response.data.data[key].attributes;
                    fetchedTypeOffEggs.push({
                        id: response.data.data[key].id,
                        name: queryPrefix.name,
                        instruction: queryPrefix.instruction,
                        image: queryPrefix.image.data.attributes.url,
                        sizes: queryPrefix.sizes,
                    });
                }
                dispatch({ type: GET_TYPEOFFEGGS, typeOffEggs: fetchedTypeOffEggs });
            })
            .catch(error => {
                console.log(error);
            });
    };
};
export const getRecipes = (sort, limit = 10) => {
    return dispatch => {
        axios
            .get(`/recipes?populate=*&sort=${sort}%3Adesc`)
            .then(response => {
                const fetchedRecipes = [];
                for (let key in response.data.data) {
                    const queryPrefix = response.data.data[key].attributes;
                    fetchedRecipes.push({
                        id: response.data.data[key].id,
                        name: queryPrefix.name,
                        difficulty: queryPrefix.difficulty,
                        time: queryPrefix.time,
                        content: queryPrefix.content,
                        category: queryPrefix.category.data.attributes.name,
                        ingredients: queryPrefix.ingredients.data,
                        image: queryPrefix.image.data.attributes.url,
                    });
                }
                dispatch({ type: GET_RECIPES, recipes: fetchedRecipes });
            })
            .catch(error => {
                console.log(error);
            });
    };
};
export const getSearchedRecipes = query => {
    return dispatch => {
        axios
            .get(`/recipes?populate=*&[filters][name][$containsi]=${query}`)
            .then(response => {
                const fetchedSearchedRecipes = [];

                for (let key in response.data.data) {
                    const queryPrefix = response.data.data[key].attributes;
                    fetchedSearchedRecipes.push({
                        id: response.data.data[key].id,
                        name: queryPrefix.name,
                        difficulty: queryPrefix.difficulty,
                        time: queryPrefix.time,
                        content: queryPrefix.content,
                        category: queryPrefix.category.data.attributes.name,
                        ingredients: queryPrefix.ingredients.data,
                        image: queryPrefix.image.data.attributes.url,
                    });
                }
                dispatch({
                    type: GET_SEARCHED_RECIPES,
                    searchedRecipes: fetchedSearchedRecipes,
                });
            })
            .catch(error => {
                console.log(error);
            });
    };
};
export const getCategories = () => {
    return dispatch => {
        axios
            .get(`/categories`)
            .then(response => {
                const fetchedCategories = [];
                for (let key in response.data.data) {
                    const queryPrefix = response.data.data[key].attributes;
                    fetchedCategories.push({
                        id: response.data.data[key].id,
                        name: queryPrefix.name,
                    });
                }
                dispatch({ type: GET_CATEGORIES, categories: fetchedCategories });
            })
            .catch(error => {
                console.log(error);
            });
    };
};
export const getIngredients = recipe => {
    return dispatch => {
        axios
            .get(
                `/recipes?filters[name][$eq]=${recipe}&populate[ingredients][populate][0]=image`,
            )
            .then(response => {
                let fetchedIngredients = {
                    ingredients: response.data.data[0].attributes.ingredients.data,
                };

                dispatch({ type: GET_INGREDIENTS, ingredients: fetchedIngredients });
            })
            .catch(error => {
                console.log(error);
            });
    };
};
