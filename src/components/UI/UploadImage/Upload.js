import React, { useState } from 'react';
import classes from './Upload.module.css';
import ImageUpload from '../ImageUpload/ImageUpload';
import * as actions from '../../../store/actions';
import LoadingImg from '../../../Login/loading.gif';
import { connect } from 'react-redux';
import Backdrop from '../Backdrop/Backdrop';
import { Transition } from 'react-transition-group'

const Upload = props => {

    const [pickedFile, setPickedFile] = useState();
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [name, setName] = useState('');

    const animationTiming = {
        enter: 300,
        exit: 300
    }

    const handleImageView = async (pickedFile, fileIsValid) => {
        if (!fileIsValid) return;

        setPickedFile(pickedFile);
    }

    const handleUpload = (close) => {
        if (name === '' || name === null || pickedFile === null) return;

        props.uploadNewItem(name, pickedFile, close)
        setPickedFile(undefined);

        if (!close) {
            setName('');
        }

    }

    const disabled = pickedFile && name.length > 0;

    return (
        <>
            <Backdrop show={props.show && showBackdrop} clicked={() => props.closeAddItem()} />
            <Transition
                in={props.show}
                timeout={animationTiming}
                mountOnEnter
                unmountOnExit
                appear
                onEntered={() => setShowBackdrop(true)}
                onExited={() => setShowBackdrop(false)}
            >
                {state => {
                    const cssClasses = [classes.addNewItem,
                    state === 'entering' ?
                        classes.openModal :
                        state === 'exiting' ? classes.exitModal : null
                    ]
                    return (
                        <div className={cssClasses.join(' ')} >
                            <div className={classes.card} >
                                {props.loading ? (
                                    <div className={classes.loading} > <img src={LoadingImg} alt='loading' /> </div>)
                                    :
                                    <div className={classes.content} >
                                        <ImageUpload
                                            center
                                            message='Seleccionar imagen'
                                            onInput={(_, pickedFile, fileIsValid) => handleImageView(pickedFile, fileIsValid)}
                                        />
                                        <div className={classes.nameInput} >
                                            <input
                                                placeholder='Nombre'
                                                className={classes.input}
                                                type='text'
                                                onChange={(event) => setName(event.target.value)} />
                                        </div>
                                        <div className={classes.buttons} >
                                            <button
                                                onClick={() => handleUpload(true)}
                                                className={`${classes.button} ${!disabled && classes.disabled}`}
                                                disabled={!disabled}
                                            >Subir</button>
                                            <button
                                                onClick={() => handleUpload(false)}
                                                className={`${classes.button} ${!disabled && classes.disabled}`}
                                                disabled={!disabled}
                                            >Subir y Agregar</button>
                                            <button
                                                onClick={() => props.closeAddItem()}
                                                className={`${classes.button}`}
                                            >Cancelar</button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    );
                }}

            </Transition>
        </>
    )
};

const mapStateToProps = state => {
    return {
        loading: state.car.loading
    }
}

const mapDispatchToProps = {
    uploadNewItem: actions.uploadNewItem,
    closeAddItem: actions.closeAddItem
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);