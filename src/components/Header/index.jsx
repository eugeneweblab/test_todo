import React from 'react';
import styled from '@emotion/styled';
import Button from '../Button';
import Typography from '../uiElements/Typography';
import { useStore } from '../../store/StoreContext';
import { useNavigate } from 'react-router-dom';

const Box = styled.header`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 15px;
    background: var(--grey-02);
    border-bottom: 1px solid var(--grey-03);
    height: 77px;
    
    .site-header {
        &__user-welcome {
            margin-right: 30px;
        }
        &__btn {
            padding-left: 30px;
            padding-right: 30px;
            max-width: 118px;
        }
    }

`;

const Header = () => {
    const { state, dispatch } = useStore();
    const navigate = useNavigate();

    const logoutHandler = () => {
        console.log('logoutHandler');

        dispatch({
                     type: 'SIGN_OUT',
                     payload: {},
                 });
        navigate('/signin/');
    }

    const userName = (state.user?.firstName ) ? state.user?.firstName + state.user?.lastName : '';

    return (
        <Box className={'site-header'}>
            <Typography className={'site-header__user-welcome'}
                        tag={'p'}
                        styleType={'text-01'}>
                {`Welcome, ${userName}`}
            </Typography>
            <Button className={'site-header__btn'}
                    type={'button'}
                    title={'LOGOUT'}
                    onClick={logoutHandler}
            />
        </Box>
    );
};

export default Header;
