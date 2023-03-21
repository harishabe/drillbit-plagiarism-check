import React, { useEffect } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import { error } from '../../utils/ToastrValidation';
import { useRouter } from "next/router";
import {
    LoginContainer,
    BannerContainer,
    ImgContainer,
    InlineText,
    AccountLink,
} from '../../style/login-style';
import LoginForm from './login-form';
import { MainHeading } from '../../components';
import { DrillBitLogo, LoginBannerIcon } from '../../assets/icon';
import {
    LOGIN_IMG_BANNER,
    LOGIN_WELCOME_DRILLBIT,
    LOGIN_VIA_INSITUTIONS
} from '../../constant/data/content';
import { BASE_URL } from '../../utils/BaseUrl'
import END_POINTS from '../../utils/EndPoints'

const Login = () => {
    const router = useRouter();
    useEffect(() => {
        if (router?.query?.message) {
            error(router?.query?.message)
        }
    }, [router])
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1} >
                    <Grid item md={7} display={{ xs: 'none', lg: 'block' }}>
                        <BannerContainer>
                            <DrillBitLogo />
                            <ImgContainer>
                                <LoginBannerIcon />
                            </ImgContainer>
                        </BannerContainer>
                    </Grid>
                    <Grid item md={5} style={{ width: '100%' }}>
                        <LoginContainer>
                            <MainHeading mb={'20px'} title={LOGIN_WELCOME_DRILLBIT} />
                            {/* <DrillBitLogoIcon /> */}
                            <LoginForm />
                            <InlineText>
                                <AccountLink>
                                    <Link href={ BASE_URL + END_POINTS.SSO_LOGIN }>{ LOGIN_VIA_INSITUTIONS }</Link>
                                </AccountLink>
                            </InlineText>
                        </LoginContainer>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Login;