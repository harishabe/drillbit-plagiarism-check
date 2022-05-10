import React from 'react';
import styled from 'styled-components';

const LoaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.5);
`;

const LoaderWrapper = styled.div`
    background:white;
    padding:20px 20px;
    border-radius:10px;
    z-index:999;
`;

const LoadingIndicator = () => {
    return (
        <LoaderContainer>
            <LoaderWrapper>
                <div className="pulse-container">
                    <div className="pulse-bubble pulse-bubble-1"></div>
                    <div className="pulse-bubble pulse-bubble-2"></div>
                    <div className="pulse-bubble pulse-bubble-3"></div>
                </div>
                <p>Please wait , data is loading...</p>
            </LoaderWrapper>
        </LoaderContainer>
    )
};

export default LoadingIndicator;