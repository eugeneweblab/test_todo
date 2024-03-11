import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/StoreContext';
import Typography from '../components/uiElements/Typography';
import InputText from '../components/formElements/InputText';
import Button from '../components/Button';
import { validateFormData } from '../helpers/validateField';
import { formFieldsErrorMessages } from '../helpers/formFieldsErrorMessages';
import {
    checkExistingUser,
    createNewUser,
} from '../helpers/apiRequests';

const Box = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .sign-in-form {
        &__wrapper {
            width: 312px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            align-items: center;
        }

        &__itself {
            width: 100%;
        }

        &__caption {
            margin-bottom: 20px;
        }

        &__input {
            margin-bottom: 12px;

            &:last-of-type {
                margin-bottom: 22px;
            }
        }

        &__submit-btn {

        }
    }

`;

const SignIn = () => {

    const { state, dispatch } = useStore();
    const navigate = useNavigate();
    const [ errorState, setErrorState ] = useState({
                                                       'username'  : {
                                                           isValid     : true,
                                                           errorMessage: '',
                                                       },
                                                       'first-name': {
                                                           isValid     : true,
                                                           errorMessage: '',
                                                       },
                                                       'last-name' : {
                                                           isValid     : true,
                                                           errorMessage: '',
                                                       },
                                                   });

    const [ formData, setFormData ] = useState({
                                                   'username'  : '',
                                                   'first-name': '',
                                                   'last-name' : '',
                                               });
    /**
     * Handles form submission and dispatches a 'SIGN_IN' action if the form data is valid.
     * @param {Object} event - The form submission event.
     */
    const onSubmitHandler = (event) => {
        setErrorState(validateFormData(formData, formFieldsErrorMessages));
        event.preventDefault();

        if ( errorState['username']['isValid'] && formData['username']) {
            dispatch({
                         type: 'SIGN_IN',
                         payload: {
                             name  : formData['username'],
                             firstName: formData['first-name'],
                             lastName: formData['last-name'],
                         },
                     });
        }
    };


    /**
     * Effect that runs when the user's name is updated in the state.
     */
    useEffect(() => {
        if (state.user.name) {
            ( async() => {

                // Check if user already exist and getting his data
                const checkForUserExist = await checkExistingUser(state.user);
                let res = {};

                if ( checkForUserExist.length ) {
                    res = checkForUserExist[0];
                }
                else {
                    res = await createNewUser(state.user);
                }

                dispatch({
                             type: 'UPDATE_USER',
                             payload: {
                                 token  : res.token,
                                 id: res.id,
                             },
                         });

                navigate('/');
            } )()
        }
    }, [state.user.name]);

    return (
        <Box>
            <div className="sign-in-form__wrapper">
                <Typography tag={'h3'}
                            className={'sign-in-form__caption'}
                            styleType={'h3'}>
                    {'Login to your account'}
                </Typography>

                <form onSubmit={onSubmitHandler}
                      className={'sign-in-form__itself'}>
                    <InputText type={'text'}
                               id={'username-field'}
                               name={'username'}
                               isValid={errorState['username']['isValid']}
                               errorMessage={errorState['username']['errorMessage']}
                               className={'sign-in-form__input'}
                               formData={formData}
                               setFormData={setFormData}
                               placeholder={'Username'}
                    />
                    <InputText type={'text'}
                               id={'first-name-field'}
                               name={'first-name'}
                               isValid={errorState['first-name']['isValid']}
                               errorMessage={errorState['first-name']['errorMessage']}
                               className={'sign-in-form__input'}
                               formData={formData}
                               setFormData={setFormData}
                               placeholder={'First Name'}
                    />
                    <InputText type={'text'}
                               id={'last-name-field'}
                               name={'last-name'}
                               className={'sign-in-form__input'}
                               formData={formData}
                               setFormData={setFormData}
                               placeholder={'Last Name'}
                    />
                    <Button type={'submit'}
                            className={'sign-in-form__submit-btn'}
                            title={'Login'}
                    />
                </form>
            </div>
        </Box>
    );
};

export default SignIn;