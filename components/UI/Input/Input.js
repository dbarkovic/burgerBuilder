import React from 'react';
import classes from './Input.css';

const input = (props) => {    
    debugger;
    console.log('Input fc',props);

    let inputElement = null;
    const inputClasses = [classes.InputElement];
    let validationError = null;

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = <p>Please enter a valid value!</p>;
    }

    console.log('>>>>>> Input classes ' , props.invalid , props.shouldValidate , props.touched);
switch (props.elementType) {
   case ('Input'): 
        console.log('>>>>>> switch Input ', inputClasses);
        inputElement = <input className={inputClasses.join(' ')}
                              value={props.value}
                              onChange={props.changed}
                              {...props.elementConfig} />;
        break;
   case ('Textarea'):
        inputElement = <textarea className={inputClasses.join(' ')}
                                 value={props.value}
                                 onChange={props.changed}
                                 {...props.elementConfig} />;
        break;
    case ('Select'):
            inputElement = <select 
                            className={inputClasses.join(' ')} 
                            value={props.value}
                            onChange={props.changed} >
                            {props.elementConfig.options.map(option => (
                                <option 
                                        key={option.value} 
                                        value={option.value}> 
                                        {option.displayValue}
                                </option>
                                )
                                )
                            }
                            </select>;
            break;
   default:
    /*    inputElement = <input 
                        className={classes.InputElement}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed} />;*/
}

return (
  <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
        {validationError}
   </div>
)

};
    
export default input;