import styled from '@emotion/styled';
import React from 'react';

const Typography = ( {
    tag,
    styleType,
    children = '',
    className,
    onClick,
    ...props
} ) => {
    
    // If the variant exists in variantsMapping, we use it.
    // Otherwise, use p tag instead.
    // "styleType" - it's styles set that will be applied
    const Component = styled(
            tag && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'label', 'div'].includes( tag )
            ? tag
            : 'p',
    )`
        ${ ( c_props ) => {
            return c_props.styleType === 'h1' && c_props.theme.h1;
        } }
        ${ ( c_props ) => {
            return c_props.styleType === 'h2' && c_props.theme.h2;
        } }
        ${ ( c_props ) => {
            return c_props.styleType === 'h3' && c_props.theme.h3;
        } }
        ${ ( c_props ) => {
            return c_props.styleType === 'h4' && c_props.theme.h4;
        } }
        ${ ( c_props ) => {
            return c_props.styleType === 'h5' && c_props.theme.h5;
        } }
        ${ ( c_props ) => {
            return c_props.styleType === 'h6' && c_props.theme.h6;
        } }
        ${ ( c_props ) => {
            return c_props.styleType === 'div' && c_props.theme.p;
        } }
        ${ ( c_props ) => {
            return c_props.styleType === 'p' && c_props.theme.p;
        } }
        ${ ( c_props ) => {
            return c_props.styleType === 'text-01' && c_props.theme['text_01'];
        } }
        ${ ( c_props ) => {
            return c_props.styleType === 'text-02' && c_props.theme['text_02'];
        } }
        ${ ( c_props ) => {
            return c_props.styleType === 'span' && c_props.theme.span;
        } }
        ${ ( c_props ) => {
            return c_props.styleType === 'label' && c_props.theme.p;
        } }
        ${ ( c_props ) => {
            return c_props.styleType === 'error' && c_props.theme.error;
        } }
    `;
    
    return (
            <Component className={ `typography__style-${ styleType } ${ className }` }
                       styleType={ styleType }
                       onClick={ onClick } { ...props }>
                { children }
            </Component>
    );
};

export default Typography;
