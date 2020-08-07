import React, { useState } from 'react';
import classes from './Upload.module.css';
import ImageUpload from '../ImageUpload/ImageUpload';
import * as actions from '../../../store/actions';
import LoadingImg from '../../../Login/loading.gif';
import { connect } from 'react-redux';

const Upload = props => {

    const [pickedFile, setPickedFile] = useState();
    const [name, setName] = useState('');
    const { user } = props;

    const handleImageView = async (pickedFile, fileIsValid) => {
        if (!fileIsValid) return;

        setPickedFile(pickedFile);
    }

    const addAndKeepAdding = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('user', user);
        formData.append('image', pickedFile);
        props.uploadNewItem(formData, true);
        setPickedFile(undefined);
        setName('');
    }

    const disabled = pickedFile && name.length > 0;

    return (
        <div className={classes.addNewItem} >
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
                                onClick={() => {
                                    const formData = new FormData();
                                    formData.append('name', name);
                                    formData.append('user', user);
                                    formData.append('image', pickedFile);
                                    props.uploadNewItem(formData)
                                }}
                                className={`${classes.button} ${!disabled && classes.disabled}`}
                                disabled={!disabled}
                            >Subir</button>
                            <button
                                onClick={() => addAndKeepAdding()}
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
    )
};

const mapStateToProps = state => {
    return {
        user: state.login.userId,
        loading: state.car.loading
    }
}

const mapDispatchToProps = {
    uploadNewItem: actions.uploadNewItem,
    closeAddItem: actions.closeAddItem
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);