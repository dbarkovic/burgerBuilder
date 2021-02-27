import * as actionTypes from '../actions/actionTypes';
import { updateObject }  from '../utillity';

const initialState = {
    ingredients: {
                    bacon: 0,
                    cheese: 0,
                    meat: 0,
                    salad: 0
                 },
    totalPrice: 0,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
    salad: 0.5,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
            const updatedState = { 
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                error: false }
            return updateObject(state.ingredients, updatedState);
        case actionTypes.REMOVE_INGREDIENT:
              return {
                  ...state,
                  ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                  },
                  totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                  error: false
              };
        case actionTypes.SET_INGREDIENTS:
            return {
                    ...state,
                    ingredients: {
                                    salad: action.ingredients.salad,
                                    bacon: action.ingredients.bacon,
                                    cheese: action.ingredients.cheese,
                                    meat: action.ingredients.meat,
                                },
                    error: false
                }
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return {
                    ...state,
                    error: true
                }
        case actionTypes.RESET_INGREDIENTS:
            return {
                  ...initialState,
                  error: false
                }
        default:  
        return state;    
    }
}

export default reducer;