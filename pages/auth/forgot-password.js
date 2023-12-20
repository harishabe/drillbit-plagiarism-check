import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles } from "@mui/styles";
import InputLabel from '@mui/material/InputLabel';
import NextLink from 'next/link';
import Image from 'next/image';
import {
    LoginContainer,
    BannerContainer,
    ImgContainer
} from './../../style/login-style';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import ForgotPwdForm from './forgotPwdForm';
import { MainHeading } from '../../components';
import { DrillBitLogo } from '../../assets/icon';
import {
    LOGIN_IMG_BANNER
} from '../../constant/data/content';

const useStyles = makeStyles(() => ({
    form: {
        width: '100%'
    },
    dropdown: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: '10px',
        marginTop: '10px'
    },
}));

const ForgotPwd = () => {
    const classes = useStyles();
    const { t } = useTranslation();
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
                    <Grid item md={ 5 } className={ classes.form }>
                        <div className={ classes.dropdown }>
                            <LanguageSwitcher />
                        </div>
                        <LoginContainer>
                            <MainHeading mb={ '20px' } title={ t('FORGET_PASSWORD')} />
                            <ForgotPwdForm />
                            <div align='center'>
                                <InputLabel>
                                    <NextLink href="/auth/login" passHref>
                                        { t('BACK_TO_LOGIN') }
                                    </NextLink>
                                </InputLabel>
                            </div>
                        </LoginContainer>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default ForgotPwd;
