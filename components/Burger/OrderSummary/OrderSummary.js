import React, {Component} from 'react';
import Auxilary from '../../../hoc/Auxilary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
   
    componentDidUpdate(){
        console.log('OrderSummary componentDidUpdate');
    };

    render () {
        const ing = Object.keys(this.props.ingredients)
        .map(igKey => { 
        return <li key={igKey}><span style={{transform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
        }) 

        return (
            <Auxilary>
                    <h3>Your order</h3>
                    <p>Del. burger with following ingredients:</p>
                    <ul>
                        {ing}
                    </ul>
                <p>Total:{this.props.totPrice.toFixed(2)}</p>
                    <p>Continue to chechkout ?</p>
                    <Button btnType='Danger' clicked={this.props.purchaseCancel}>CANCEL</Button>
                    <Button btnType='Success' clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Auxilary>
        )
    }
};

export default OrderSummary;