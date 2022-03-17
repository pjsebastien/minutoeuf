import axios from '../../axios-instance';

export const GET_TYPEOFFEGGS = 'GET_TYPEOFFEGGS';
export const GET_RECIPES = 'GET_RECIPES';
export const GET_CATEGORIES = 'GET_CATEGORIES';

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
export const getRecipes = sort => {
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
