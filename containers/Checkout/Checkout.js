import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
// eslint-disable-next-line
import classes from './Checkout.css';
import { connect } from 'react-redux'
// eslint-disable-next-line
import ContactData from '../../containers/Checkout/ContactData/ContactData'

class Checkout extends Component {

 /*       state = {
            ingredients: null,
            price: 0
        }

        componentWillMount() {
            const query = new URLSearchParams(this.props.location.search);
            const ingredients = {};
              let price = 0;
            for (let param of query.entries()){
                if (param[0] === 'price'){
                    price = param[1];
                } else {
                    ingredients[param[0]] = +param[1];
                }
            }
            this.setState({ingredients: ingredients, totalPrice: price})
        }
   */     
        componentWilldMount () {
                this.props.onInitPurchase();
        }

        checkoutCancelledHandler = () => {
            this.props.history.goBack();
        }

        checkoutContinuedHandler = () => {
            this.props.history.replace('/checkout/contact-data');
        }
        
    render() {
        let summary = <Redirect to='/' />
        
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null
            summary = 

            <div>
            {purchasedRedirect}    
            <CheckoutSummary 
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}/>
            <Route path={this.props.match.path + '/contact-data'} 
            /*render={(props) => (<ContactData 
                             ingredients={this.state.ingredients}
                             price={this.props.price}
                             {...props}/>)}*/
            component={ContactData}
            />                </div> 
        }
        console.log('Checkout');
            return summary;
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}



export default connect(mapStateToProps)(Checkout);