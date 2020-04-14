import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxilary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:4,
        purchasable: false,
        purchasing: false,
        loading: false
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
const oldCount = this.state.ingredients[type];
const updatedCount = oldCount + 1;
const updatedIngredients= {
        ...this.state.ingredients
        };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
 this.setState({totalPrice: newPrice, ingredients: updatedIngredients});;
    this.updatePurchaseState(updatedIngredients);
}
    

    removeAllIngredients = () => {
        
        const ingredientsReset = {
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        };

        console.log();
        this.setState( {ingredients: ingredientsReset} );
        this.updatePurchaseState(ingredientsReset);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients= {
                ...this.state.ingredients
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

            this.setState({loading: true});
             // eslint-disable-next-line
            const order= {
                ingredients: this.state.ingredients,
                price: this.state.totalPrice,
                customer: {
                    name: 'Db',
                    adress: { 
                        street: 'A',
                        zipCode: '12',
                        country: 'CRO'
                        },
                    email: 'db@git.io '
                },
                deliveryMethod: 'fast'
            }

             axios.post('/orders.json', order)
             .then(response => this.setState({loading: false, purchasing: false}))
             .catch(error => this.setState({loading: false, purchasing: false}));
           
    }

    render () {

        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = <OrderSummary ingredients={this.state.ingredients}
        purchaseCancel={this.purcahseCancelHandler}
        purchaseContinue={this.purcahseContinueHandler}
        totPrice={this.state.totalPrice}/>;

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purcahseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                ingredientAdded={this.addIngredientHandler}
                ingredientDeleted={this.removeIngredientHandler}
                ingredientTrunk={this.removeAllIngredients}
                purchasable={this.state.purchasable}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                ordered={this.purchaseHandler}/>
            </Auxiliary>
        );
    }
};

export default withErrorHandler(BurgerBuilder, axios);
