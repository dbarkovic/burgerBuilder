import React, { Component } from 'react';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component{
    state = {
        name: '',
        email:'',
        address: {
            street: '',
            postalCode: ''
        }
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
             // eslint-disable-next-line
            const order= {
                ingredients: this.props.ingredients,
                price: this.props.price,
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
             .then(response => {this.setState({loading: false})
                                this.props.history.push('/');
              })
             .catch(error => this.setState({loading: false}));
          
    }

    render() {
        let form = (
            <form>
                    <input className={classes.Input} type='text' name='name' placeholder='Your name'/>
                    <input className={classes.Input} type='text' name='email' placeholder='Your Mail'/>
                    <input className={classes.Input} type='text' name='street' placeholder='Street'/>
                    <input className={classes.Input} type='text' name='postalcode' placeholder='Postal code'/>
                    <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
                </form>
        );

        if (this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;