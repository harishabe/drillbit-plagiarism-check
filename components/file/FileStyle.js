import styled from 'styled-components';

export const Input = styled('input')({
    display: 'none',
});

export const DragAreaPadding = styled('div')({
    padding: '1px 50px'
});

export const DragDropArea = styled('div')({
    border: '1px dashed rgba(0, 0, 0, 0.38)',
    borderRadius: '20px',
    padding: '15px',
    background: '#F9FBFF',
    textAlign: 'center',
    marginTop: '5px',
    padding: '50px'
});

export const ChooseLabel = styled('label')({
    display: 'inline-block',
    cursor: 'pointer'
});

export const ChipContainer = styled('div')({
    display:'inline-flex',
    marginTop: '10px', 
    marginLeft: '10px',

    '@media (min-width: 600px)': {
        maxWidth: '400px',
    },
    '@media (min-width: 960px)': {
        maxWidth: '600px',
    },
    '@media (min-width: 1280px)': {
        maxWidth: '750px',
    },
});

export const ContentCenter = styled('div')({
    //textAlign: 'center'
});

