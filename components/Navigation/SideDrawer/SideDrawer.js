import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedlasses=[classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedlasses=[classes.SideDrawer, classes.Open];
    }
    return (
        <Auxiliary>
            <Backdrop show={props.open} onClick={props.closed}/>
                <div className={attachedlasses.join(' ')}>
                    <div className={classes.Logo}>
                     <Logo height='11%'/>
                    </div>
                    <nav>
                        <NavigationItems/>
                    </nav>
                </div>
        </Auxiliary>
    );
}

export default sideDrawer;