import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngridient/BurgerIngridient';

const burger = (props) => {

        const transformedIngredients = Object.keys(props.ingredients)
        .map(data => { return [...Array(props.ingredients[data])].map((_,i) => {
                return <BurgerIngredient key={data+i} type={data}/>       
               })
        })
        .reduce((arr,el)=>{
return arr.concat(el);
        }, []);
        
        window.test=transformedIngredients;     
       return (<div className={classes.Burger}>
                <BurgerIngredient type='bread-top'/> 
                {transformedIngredients}
                <BurgerIngredient type='bread-bottom'/> 
        </div>);
};

export default burger;