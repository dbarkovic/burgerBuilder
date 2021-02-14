import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngridients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }

};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
};

export const resetIngredients = () => {
    return {
        type: actionTypes.RESET_INGREDIENTS
    }
};

export const initIngredients = () => {
    return dispatch => {
   axios.get('https://react-my-burger-e77d6.firebaseio.com/ingredients.json')
            .then( response => {
                console.log(response);
                //this.setState({ingredients: response.data})
                dispatch(setIngridients(response.data));
            })
            .catch(error => {
                //this.setState({error: true})
                dispatch(fetchIngredientsFailed());
            })
    };
};