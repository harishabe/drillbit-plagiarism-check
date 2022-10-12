import React from 'react';
import { DrillBitSymbolLogo } from '../../assets/icon';
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';

const LoaderContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    align-content:center;
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    right: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
`;

const LoaderWrapper = styled.div`
    background: white;
    padding: 5px 0px;
    border-radius: 10px;
`;

const LogoContainer = styled.div`
    margin-left:75px;
`;

const BeatContainer = styled.div`
    text-align:center;
`;

export const LoadingIndicator = () => {
    return (
        <LoaderContainer>
            <LoaderWrapper>
                <LogoContainer>
                    <DrillBitSymbolLogo />
                </LogoContainer>
                <BeatContainer>
                    <BeatLoader color="#3672FF" />
                </BeatContainer>
            </LoaderWrapper>
        </LoaderContainer>
    )
};