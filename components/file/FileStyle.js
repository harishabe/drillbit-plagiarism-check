import React from 'react';
import styled from 'styled-components';

export const Input = styled('input')({
    display: 'none',
});

export const DragAreaPadding = styled('div')({
    padding: '1px 150px'
});

export const DragDropArea = styled('div')({
    border: '1px dashed rgba(0, 0, 0, 0.38)',
    borderRadius: '20px',
    padding: '15px',
    background: '#F9FBFF',
    textAlign: 'center',
    marginTop: '20px',
    padding: '50px'
});

export const ChooseLabel = styled('label')({
    display: 'inline-block',
    padding: '6px 12px',
    cursor: 'pointer'
});

export const ChipContainer = styled('span')({
    marginTop: '10px', 
    marginLeft: '10px'
});

export const ContentCenter = styled('div')({
    textAlign: 'center'
});

