import React from 'react';
import Auxilary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
const ing = Object.keys(props.ingredients)
.map(igKey => { 
return <li key={igKey}><span style={{transform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
 })
return (
<Auxilary>
    <h3>Your order</h3>
    <p>Del. burger with following ingredients:</p>
    <ui>
        {ing}
    </ui>
<p>Total:{props.totPrice.toFixed(2)}</p>
    <p>Continue to chechkout ?</p>
    <Button btnType='Danger' clicked={props.purchaseCancel}>CANCEL</Button>
    <Button btnType='Success' clicked={props.purchaseContinue}>CONTINUE</Button>
</Auxilary>
)};

export default orderSummary;