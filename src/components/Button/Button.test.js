import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from './index';

describe('Button Component Tests', () => {
    test('renders Button component with default style', () => {
        render(<Button title="Click me"/>);
        const buttonElement = screen.getByText('Click me');
        expect(buttonElement).toBeTruthy();
    });

   test('handles button click correctly', () => {
        const onClickMock = jest.fn();
        render(<Button title="Click me" onClick={onClickMock} />);
        const buttonElement = screen.getByText('Click me');
        fireEvent.click(buttonElement);
        expect(onClickMock).toHaveBeenCalled();
    });

    test('renders disabled Button component', () => {
        render(<Button title="Click me" isDisabled />);
        const buttonElement = screen.getByText('Click me').closest("button");
        expect(buttonElement).toHaveAttribute('disabled');
    });

    test('renders loading Button component', () => {
        render(<Button title="Click me" isLoading />);
        const buttonElement = screen.getByText('Click me').closest("button");
        expect(buttonElement).toHaveAttribute('disabled');
    });


    test('handles button click when not disabled or loading', async () => {
        const onClickMock = jest.fn();
        render(<Button title="Click me" onClick={onClickMock} />);
        const buttonElement = screen.getByText('Click me');
        fireEvent.click(buttonElement);
        await waitFor(() => {
            expect(onClickMock).toHaveBeenCalled();
        });
    });
});