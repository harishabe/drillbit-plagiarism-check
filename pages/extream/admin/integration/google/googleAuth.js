import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { Google } from '@mui/icons-material';
import { Grid, Box, Button } from '@mui/material';
import Admin from '../../../../../layouts/Admin';
import {
    BreadCrumb,
    MainHeading,
    CardView,
    SubTitle1
} from './../../../../../components';
import { GetGoogleLms } from '../../../../../redux/action/admin/AdminAction';
import ToastrValidation from '../../../../../utils/ToastrValidation';

const useStyles = makeStyles(() => ({
    padding: {
        padding: '0px 50px'
    },
    button: {
        marginTop: '35px',
        textAlign: 'center'
    }
}));

const IntegrationBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/extream/admin/dashboard',
        active: false,
    },
    {
        name: 'Integrations',
        link: '/extream/admin/integration',
        active: false,
    },
    {
        name: 'Google Classroom',
        link: '',
        active: true,
    },
];

const googleAuth = ({
    GetGoogleLms,
    googleConfigData,
}) => {
    const classes = useStyles();
    const router = useRouter();

    useEffect(() => {
        GetGoogleLms();
        if (router?.query?.error) {
            ToastrValidation({
                status: 'ssoError',
                message: router?.query?.error
            })
        }
    }, []);

    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 10 } xs={ 10 }>
                        <BreadCrumb item={ IntegrationBreadCrumb } />
                    </Grid>
                </Grid>
            </Box>

            <Grid container spacing={ 1 }>
                <Grid item md={ 12 } xs={ 12 }>
                    <CardView>
                        <div className={ classes.padding }>
                            <Grid container spacing={ 1 }>
                                <Grid item md={ 12 } xs={ 12 }>
                                    <MainHeading title='Welcome to Google Classroom Integration!' />
                                </Grid>

                                <Grid item md={ 12 } xs={ 12 }>
                                    <SubTitle1 title={ 'Enhance academic integrity and originality with our powerful plagiarism detection tools integrated with Google Classroom.' } />

                                    <SubTitle1 title={ 'Sign in to Google and enhance your app experience by accepting all required scopes for seamless integration.' } />

                                    <SubTitle1 title={ 'Your privacy matters to us. Rest assured, we strictly abide by GDPR regulations to safeguard your data.' } />
                                </Grid>

                                <Grid container spacing={ 1 }>
                                    <Grid item md={ 4 } xs={ 4 }></Grid>
                                    <Grid item md={ 4 } xs={ 4 } className={ classes.button }>
                                        <Button
                                            startIcon={ <Google /> }
                                            href={ googleConfigData }
                                            variant="contained"
                                            size="large"
                                        >
                                            Sign up with Google
                                        </Button>
                                    </Grid>
                                    <Grid item md={ 4 } xs={ 4 }></Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </CardView>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    googleConfigData: state?.adminIntegrationData?.googleConfigData,
    isLoading: state?.adminIntegrationData?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetGoogleLms: () => dispatch(GetGoogleLms()),
    };
};

googleAuth.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(googleAuth);