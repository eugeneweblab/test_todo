import React from 'react';
import styled from '@emotion/styled';
import Typography from '../uiElements/Typography';

const Box = styled.div`
    width: 100%;
    max-width: 100%;
    position: relative;
    
    .form-element {
        &__text-input {
            ${props => props.theme.p};
            appearance: none;
            border-radius: 0;
            color: var(--primary-black);
            border: 1px solid var(--grey-03);
            background: var(--grey-02);
            height: 40px;
            outline: none;
            width: 100%;
            padding: 0 15px;

            &::placeholder {
                color: var(--grey-04);
            }

            &:hover {

            }

            &:focus {
                border-color: var(--grey-04);
            }
        }

        &__text-input-wrapper {
            position: relative;
            width: 100%;
        }
        
        &__error-message {
            padding: 0 15px;
            position: absolute;
            left: 0;
            top: 42px;
            width: 100%;
        }
        
    }

    &.error {
        .form-element__text-input {
            border: 1px solid var(--red-01);
        }
        .form-element__error-message {
            color: var(--red-01);
        }
    }

    &.successful {
        .form-element__text-input {

        }
    }

    &.disabled {
        .form-element__text-input {
            opacity: 0.5;
            pointer-events: none;
        }
    }
    
`;

const InputText = ({
                       className = '',
                       isRequired = false,
                       name,
                       id = `id-${name}`,
                       type,
                       placeholder = '',
                       isValid = true,
                       isDisabled,
                       isSuccess,
                       onChange,
                       setFormData,
                       formData,
                       errorMessage,
                        ...props
                   }) => {

    const onChangeHandler = (event) => {
        onChange && onChange();
        setFormData(prevState => {
            return {
                ...prevState,
                [name]: event.target.value,
            };
        });
    };

    return (
        <Box
            className={`form-element__text-input-box ${className} 
                        ${isSuccess ? 'successful' : ''} 
                        ${isValid ? '' :'error'} 
                        ${isDisabled ? 'disabled' : ''} `}>

            <input type={type}
                   id={id}
                   className={`form-element__text-input ${props.ref}`}
                   placeholder={placeholder}
                   value={formData[name]}
                   autoComplete="off"
                   name={name}
                   onChange={onChangeHandler}
                   required={isRequired}
                   {...props}
            />

            {
                errorMessage &&
                <Typography className={'form-element__error-message'}
                            tag={'span'}
                            styleType={'error'}>
                    {errorMessage}
                </Typography>
            }
        </Box>
    );
};

export default InputText;