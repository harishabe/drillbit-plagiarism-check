import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Image from 'next/image'
import Link from 'next/link'
import {
    LoginContainer,
    InlineText,
    AccountLink,
    BannerContainer,
    ImgContainer
} from './login-style'
import LoginForm from './login-form'
import { Heading, SubTitle,MainHeading } from '../../components'
import { DrillBitLogo, DrillBitLogoIcon } from '../../assets/icon'
import {
    LOGIN_IMG_BANNER,
    LOGIN_WELCOME_DRILLBIT,
    LOGIN_NEW_DRILLBIT,
    LOGIN_CREATE_ACCOUNT
} from '../../constant/data/content'

const Login = () => {
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
                            <MainHeading mb={'20px'} title={LOGIN_WELCOME_DRILLBIT} />
                            {/* <DrillBitLogoIcon /> */}
                            <LoginForm />
                            {/* <InlineText>
                                <AccountLink>
                                    <Link href="/posts/first-post">{LOGIN_CREATE_ACCOUNT}</Link>
                                </AccountLink>
                            </InlineText> */}
                        </LoginContainer>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Login