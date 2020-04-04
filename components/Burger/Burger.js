import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngridient/BurgerIngridient';

const burger = (props) => {
        console.log('bok katjica: ', props.ingredients);
        let transformedIngredients = Object.keys(props.ingredients)
        .map(data => { console.log('r1',data); 
                       return [...Array(props.ingredients[data])].map((_,i) => {
                console.log('r2', i);
                return <BurgerIngredient key={data+i} type={data}/>       
               })
        })
        .reduce((arr,el)=>{console.log('r3', arr, el); 
                return arr.concat(el);
        }, []);
        if (transformedIngredients.length===0) {
                transformedIngredients=<p>Please start adding some ingredients</p>
        };

        window.test=transformedIngredients;     
       return (<div className={classes.Burger}>
                <BurgerIngredient type='bread-top'/> 
                {transformedIngredients}
                <BurgerIngredient type='bread-bottom'/> 
        </div>);
};

export default burger;