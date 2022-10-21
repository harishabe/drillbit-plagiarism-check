import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Link from 'next/link';
import Image from 'next/image';
import {
    LoginContainer,
    BannerContainer,
    ImgContainer
} from './../../style/login-style';
import ResetPwdForm from './resetPwdForm';
import { MainHeading } from '../../components';
import { DrillBitLogo } from '../../assets/icon';
import {
    LOGIN_IMG_BANNER
} from '../../constant/data/content';

const ResetPwd = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1} >
                    <Grid item md={7} display={{ xs: 'none', lg: 'block' }}>
                        <BannerContainer>
                            <DrillBitLogo />
                            <ImgContainer>
                                <Image
                                    src="/img/login-banner.svg"
                                    alt={LOGIN_IMG_BANNER}
                                    width={500}
                                    height={500}
                                />
                            </ImgContainer>
                        </BannerContainer>
                    </Grid>
                    <Grid item md={5} style={{ width: '100%' }}>
                        <LoginContainer>
                            <MainHeading mb={'20px'} title='Reset Password' />
                            <ResetPwdForm />
                            <div align='center'>
                                <InputLabel>
                                    <Link href="/auth/login"> « Back to login</Link>
                                </InputLabel>
                            </div>
                        </LoginContainer>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default ResetPwd;
