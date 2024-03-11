import React from 'react';
import styled from '@emotion/styled';
import Typography from '../uiElements/Typography';

const Box = styled.button`
    position: relative;
    background-color: var(--blue-01);
    transition: background-color 0.3s;
    cursor: pointer;
    border: none;
    outline: none;
    width: 100%;
    max-width: 100%;
    height: 45px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
    text-transform: uppercase;
    color: var(--primary-white);

    &:hover {
        background-color: var(--blue-01-hover);
    }

    &.selected,
    &:active {
        background-color: var(--blue-01-hover);
    }

    &.disabled,
    &:disabled {
        opacity: 0.5;
        pointer-events: none;
    }

    &.focused,
    &:focus {
        outline: none;
        appearance: none;
    }

    &.loading {
        opacity: 0.5;
        pointer-events: none;

        &:after {
            animation: loading-spinner 1s infinite ease-in;
            width: 20px;
            height: 20px;
            position: absolute;
            content: '';
            display: block;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background-image: url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiICB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMCAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4gICAgPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTczLDUwYzAtMTIuNy0xMC4zLTIzLTIzLTIzUzI3LDM3LjMsMjcsNTAgTTMwLjksNTBjMC0xMC41LDguNS0xOS4xLDE5LjEtMTkuMVM2OS4xLDM5LjUsNjkuMSw1MCI+ICAgICAgPGFuaW1hdGVUcmFuc2Zvcm0gICAgICAgICAgYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiAgICAgICAgICBhdHRyaWJ1dGVUeXBlPSJYTUwiICAgICAgICAgIHR5cGU9InJvdGF0ZSIgICAgICAgICBkdXI9IjFzIiAgICAgICAgICBmcm9tPSIwIDUwIDUwIiAgICAgICAgIHRvPSIzNjAgNTAgNTAiICAgICAgICAgIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPiAgPC9wYXRoPjwvc3ZnPg==);
        }

    }

    @keyframes loading-spinner {
        from {
            transform: rotate(0) translate(-50%, -50%);
        }
        to {
            transform: rotate(360deg) translate(-50%, -50%);
        }
    }
`;

const Button = ({
                    title,
                    className,
                    isDisabled = false,
                    isLoading = false,
                    type = 'button',
                    onClick = () => {
                    },
                }) => {

    return (
        <Box onClick={onClick}
             type={type}
             disabled={isDisabled || isLoading}
             className={`${className}`}>

            {
                title &&
                <Typography className={''}
                            tag={'span'}
                            styleType={'text-02'}>
                    {title}
                </Typography>
            }
        </Box>

    );
};

export default Button;
