import React, { Container } from 'react';
import Auxiliary from '../../hoc/Auxiliary';

class BurgerBuilder extends Container {
    render () {
        return(
            <Auxiliary>
                <div>Burger</div>
                <div>Build controls</div>
            </Auxiliary>
        );
    }
};

export default BurgerBuilder;