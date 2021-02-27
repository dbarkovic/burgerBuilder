import React , { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'Input',
                elementConfig: {
                type: 'email',
                placeholder: 'Mail address'
                 },
                value:'',
                validation: {
                        required: true,
                        isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'Input',
                elementConfig: {
                type: 'password',
                placeholder: 'Password'
                 },
                value:'',
                validation: {
                        required: true,
                        minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true    
    }

    componentDidMount(){
        if (!this.props.building && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }
    inputChangedHandler = (event, controlName) => {
            const updatedControls = {
                ...this.state.controls, 
                [controlName]: {
                    ...this.state.controls[controlName],
                    value: event.target.value,
                    valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                    touched: true
                }

            };
            this.setState({controls: updatedControls});
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

    submmitHandler = (event) => {
        event.preventDefault();
        console.log('>>>>>> submmitHandler ', event);
        this.props.onAuth(this.state.controls.email, this.state.controls.password, this.state.isSignup)
    }


    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup}
        })
    }

    render () {
        const formElementsArray = [];

        for (let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });

        }

        let form = formElementsArray.map( data => 
            <Input 
               key={data.id} 
               elementType={data.config.elementType}
               elementConfig={data.config.elementConfig}
               value={data.value}
               invalid={!data.config.valid}
               shouldValidate={data.config.validation}
               touched={data.config.touched}
               changed={(event) => this.inputChangedHandler(event, data.id)}               
               />);
               
        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;
        console.log('>>>>> authRedirectPath >>>>', this.props.authRedirectPath)
        if (this.props.isAuthenticate) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        };

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submmitHandler}>
                    {form}
                    <Button btnType='Success'>SUBMMIT</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType='Danger'>SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
                </Button>
            </div>
        )        
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticate: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirect: state.auth.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);