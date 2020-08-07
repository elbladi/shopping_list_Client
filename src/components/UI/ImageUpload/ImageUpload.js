import React, { useRef, useState } from 'react';
import './ImageUpload.css';
import axios from 'axios';
import Button from './Button';

const ImageUpload = props => {
    const filePickerRef = useRef();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);


    const pickedHandler = event => {
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];

            const formData = new FormData();
            formData.append('name', 'imageName');
            formData.append('user', 'tempImg');
            formData.append('image', pickedFile);

            axios.post(process.env.REACT_APP_API + '/api/item/removeBackground', formData)
                .then(resp => {
                    setPreviewUrl(process.env.REACT_APP_API + resp.data.image);
                    setIsValid(true);
                    fileIsValid = true;
                    props.onInput(props.id, pickedFile, fileIsValid);
                }).catch(err => {
                    console.log(err)
                })
        } else {
            setIsValid(false);
            fileIsValid = false;
            props.onInput(props.id, pickedFile, fileIsValid);

        };
    };

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    return (
        <div className="form-control">
            <input
                type='file'
                ref={filePickerRef}
                id={props.id}
                style={{ display: 'none' }}
                accept='.jpg,.png,jpeg'
                onChange={pickedHandler}
            />
            <div className={`image-upload ${props.center && "center"}`} >
                <div className={`image-upload__preview ${props.from}`} >
                    {previewUrl && <img src={previewUrl} alt="Preview" />}
                    {!previewUrl && <p>Selecciona una imagen</p>}
                </div>
                <Button btnType={props.btnType} clicked={pickImageHandler}>{props.message}</Button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    );
};

export default ImageUpload;