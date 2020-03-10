import React from 'react';
import classes from './Modal.css';
import Auxillary from '../../../hoc/Auxiliary';
import BackDrop from './../../UI/Backdrop/Backdrop';

const modal = (props) => (
    <Auxillary>
        <BackDrop show={props.show} odaberi={props.modalClosed}/>
    <div className={classes.Modal}
     style={{transform: props.show ? 'translateY(0)' : 'translateY(-100vh)', 
             opacity: props.show ? '1' : '0' }}>
    {props.children}
</div>
</Auxillary>
);


export default modal;