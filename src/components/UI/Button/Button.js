import React from 'react';
import { ReactComponent as ArrowUp } from '../assets/arrow.svg';
import { ReactComponent as BotonMas } from '../assets/botonMas.svg';
import { ReactComponent as UndoDelete } from '../assets/undo.svg';
import classes from './Button.module.css';

const ButtonUp = props => {

    const onScroll = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (

        <div className={classes.up} >
            <BotonMas onClick={() => props.show()} />
            {props.undo && <UndoDelete onClick={() => props.clicked()} />}
            <ArrowUp onClick={() => onScroll()} />
        </div>
    )
};

export default ButtonUp;