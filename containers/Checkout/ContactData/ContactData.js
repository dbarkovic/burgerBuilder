import React, { Component } from 'react';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';

class ContactData extends Component{
    state = {
        orderForm: {                
          name: {
                            elementType: 'Input',
                            elementConfig: {
                            type: 'text',
                            placeholder: 'Your name'
                             },
                    value:'',
                    validation: {
                            required: true
                    },
                    valid: false,
                    touched: false
                  },
          street: {
                        elementType: 'Input',
                        elementConfig: {
                        type: 'text',
                        placeholder: 'Address'
                        },
                        value:'',
                        validation: {
                                required: true
                        },
                        valid: false,
                        touched: false
                  },
          zipCode: {
            elementType: 'Input',
            elementConfig: {
            type: 'text',
            placeholder: 'Zip code number'
            },
            value:'',
            validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 5
            },
            valid: false,
            touched: false
            },
          country: {
            elementType: 'Input',
            elementConfig: {
            type: 'text',
            placeholder: 'Country name'
            },
            value:'',
            validation: {
                    required: true
            },
            valid: false,
            touched: false
      },
          email: {
            elementType: 'Input',
            elementConfig: {
            type: 'email',
            placeholder: 'Email'
            },
            value:'',
            validation: {
                    required: true
            },
            valid: false,
            touched: false
      },
          deliveryMethod:  {
            elementType: 'Select',
            elementConfig: {
            options: [
                {value: 'fastest', displayValue: 'Fastest'},
                {value: 'cheapest', displayValue: 'Cheapest'}
                ],
            },
            validation: {
                required: false
            },
            value: 'fastest',
            valid: true
      },
    },
    formIsValid: false,
    loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
             // eslint-disable-next-line
            const formData = {};
            for (let formElementIdentifier in this.state.orderForm) {
                formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
            }
            const order= {
                ingredients: this.props.ings,
                price: this.props.price,
                orderData: formData
            }

             axios.post('/orders.json', order)
             .then(response => {this.setState({loading: false})
                                this.props.history.push('/');
              })
             .catch(error => this.setState({loading: false}));
          
    }
    checkValidity(value, rules){
        let isValid = true;
        console.log('>>>>>> enter checkValidity', value, rules);

        if (rules.required) {
            console.log('>>>>>> 1. if checkValidity', value, rules);
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
           }
        
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
           }
        
        updatedFormElement.value=event.target.value;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched=true;
        updatedOrderForm[inputIdentifier] = updatedFormElement

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
            console.log('formIsValid', inputIdentifier);
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});

        console.log('>>>>>> event.target.type', event.target.type);
        console.log('>>>>>> inputIdentifier', inputIdentifier);
        
    }

    render() {
        const formElementsArray = [];

        for (let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });

        }

        let form = (
            <form onSubmit={this.orderHandler}>
                    {formElementsArray.map( data => {
                        console.log('form', data);
                        return <Input
                        key={data.id}
                        elementType={data.config.elementType}
                        elementConfig={data.config.elementConfig}
                        value={data.value}
                        invalid={!data.config.valid}
                        shouldValidate={data.config.validation}
                        touched={data.config.touched}
                        changed={(event) => this.inputChangedHandler(event, data.id)}
                        />
                    }
                    )
                    }
                    <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients, 
        price: state.totalPrice
    }
}

export default ContactData;