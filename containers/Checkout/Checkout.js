import React, {Component} from 'react';
import classes from './Checkout.css';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

        state = {
            ingredients: {
                salad: 1,
                meat: 1,
                cheese: 1,
                bacon: 1
            }
        }
        
    render() {
        console.log('Checkout');
            return( 
                <div>
                    <CheckoutSummary ingredients={this.state.ingredients}/>
                </div> );
    
    }

}

export default Checkout;