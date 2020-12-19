import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxilary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actonTypes from '../../store/actions';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    
    componentDidMount () {
   /* temporarily commented out
   axios.get('https://react-my-burger-e77d6.firebaseio.com/ingredients.json')
            .then( response => {
                console.log(response);
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: true})
            })
    */
    }

    updatePurchaseState =(ingredients)=>{
   
        const sum = Object.keys(ingredients)
        .map(key => { return ingredients[key]})
        .reduce((sum,el)=>{
            return sum + el;
        },0)
        this.setState({purchasable: sum > 0});
    }
    
 addIngredientHandler = (type) => {
const oldCount = this.props.ings[type];
const updatedCount = oldCount + 1;
const updatedIngredients= {
        ...this.props.ings
        };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
 this.setState({totalPrice: newPrice, ingredients: updatedIngredients});;
    this.updatePurchaseState(updatedIngredients);
}
    

    removeAllIngredients = () => {
        window.test =this.state;
        const ingredients={salad:0,
            bacon:0,
            cheese:0,
            meat:0};
        
        this.setState({ingredients: ingredients, totalPrice: 0});

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.props.ings[type];
        if(oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients= {
                ...this.props.ings
                };
            updatedIngredients[type] = updatedCount;
            const priceDeduction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;
         this.setState({totalPrice: newPrice, ingredients: updatedIngredients});;
         this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purcahseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purcahseContinueHandler = () => {
        //alert('You continue !');

         const queryParam = [];
         for (let i in this.props.ings) {
             queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]))
         }
         queryParam.push('price=' + this.state.totalPrice);
         const queryString = queryParam.join('&');
         this.props.history.push({
             pathname:'/checkout',
             search: '?' + queryString}); 
    }

    render () {

        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null; 


        let burger = this.state.error ? <p>Ingredients can't be fetched !</p>:<Spinner />;

        if (this.props.ings)   {
         burger = ( <Auxiliary>
                        <Burger ingredients={this.props.ings}/>
                        <BuildControls 
                                ingredientAdded={this.props.onIngridientsAdded}
                                ingredientDeleted={this.props.onIngridientsRemoved}
                                ingredientTrunk={this.removeAllIngredients}
                                purchasable={this.state.purchasable}
                                disabled={disabledInfo}
                                price={this.state.totalPrice}
                                ordered={this.purchaseHandler}/>
                     </Auxiliary>);

        orderSummary = <OrderSummary ingredients={this.props.ings}
        purchaseCancel={this.purcahseCancelHandler}
        purchaseContinue={this.purcahseContinueHandler}
        totPrice={this.state.totalPrice}/>;
        }
        
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purcahseCancelHandler}>
                    {orderSummary}
                </Modal>
                    {burger}
            </Auxiliary>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngridientsAdded: (ingName) => dispatch({type: actonTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngridientsRemoved: (ingName) => dispatch({type: actonTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
