import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles } from "@mui/styles";
import ToastrValidation from '../../utils/ToastrValidation';
import { useRouter } from "next/router";
import {
    LoginContainer,
    BannerContainer,
    ImgContainer,
    InlineText,
} from '../../style/login-style';
import InputButton from '../../components/form/elements/InputButton';
import LanguageSwitcher from '../../components/LanguageSwitcher';
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

const Login = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const router = useRouter();
    useEffect(() => {
        if (router?.query?.message) {
            ToastrValidation({
                status: 'ssoError',
                message: router?.query?.message
            })
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
                    <Grid item md={ 5 } className={ classes.form }>
                        <div className={ classes.dropdown }>
                            <LanguageSwitcher/>
                        </div>
                        <LoginContainer>
                            <MainHeading mb={'20px'} title={t('LOGIN_WELCOME_DRILLBIT')} />
                            <LoginForm />
                            <InputButton
                                field={ {
                                    'field_type': 'button',
                                    'id':'login_via_institution',
                                    // 'label': t('LOGIN_VIA_INSITUTIONS'),
                                    'href': BASE_URL + END_POINTS.SSO_LOGIN
                                } }
                            />
                        </LoginContainer>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Login;