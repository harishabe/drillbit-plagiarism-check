import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Admin from './../../../layouts/Admin';
import {
    BreadCrumb,
    CardView,
    Heading,
    MainHeading,
    SubHeading,
    SubTitle,
    SubTitle1
} from '../../../components';
import { ConfigIcon } from '../../../assets/icon';
import { GetIntegrationDetailData } from '../../../redux/action/admin/AdminAction';
import END_POINTS from '../../../utils/EndPoints';
import { Divider } from '@mui/material';

const useStyles = makeStyles({
    margin: {
        margin: '15px 0px'
    },
    inlineDisplay: {
        display: 'flex'
    },
    mr25: {
        marginRight: '25px'
    },
    ml25: {
        marginLeft: '25px'
    },
    ml10:{
        marginLeft: '10px'
    },
    mt10: {
        marginTop: '10px'
    }
});

const InstructorBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/admin/dashboard',
        active: false,
    },
    {
        name: 'Integrations',
        link: '/admin/integration',
        active: false,
    },
    {
        name: 'Integration details',
        link: '',
        active: true,
    },
];

const Moodle = ({
    GetIntegrationDetailData,
    integrationData
}) => {

    const classes = useStyles();

    const router = useRouter();

    useEffect(() => {
        GetIntegrationDetailData(END_POINTS.ADMIN_MOODLE_INTEGRATION);
    }, []);


    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={10}>
                        <BreadCrumb item={InstructorBreadCrumb} />
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                        <MainHeading title={router?.query?.integration?.charAt(0).toUpperCase() + router?.query?.integration?.slice(1) + ' ' + 'Integration'} />
                        <CardView>
                            <SubHeading title={router?.query?.integration?.charAt(0).toUpperCase() + router?.query?.integration?.slice(1) + ' ' + 'is configured'} />
                            <Button className={classes.margin} variant="contained">
                                <ConfigIcon /> <span className={classes.ml10}>Change Configuration</span>
                            </Button>
                            <Divider className={classes.mt10} />
                            <div className={classes.margin}></div>
                            <SubTitle title="Technical Contact" />
                            <div className={classes.inlineDisplay}>
                                <SubTitle1 title="Name" />
                                <div className={classes.mr25}></div>: <div className={classes.ml25}>
                                    <SubTitle title={integrationData?.name} /></div>
                            </div>
                            <div className={classes.inlineDisplay}>
                                <SubTitle1 title="Email Address" />
                                <div className={classes.mr25}></div>: <div className={classes.ml25}>
                                    <SubTitle title={integrationData?.email} /></div>
                            </div>
                            <div className={classes.inlineDisplay}>
                                <SubTitle1 title="Phone Number" />
                                <div className={classes.mr25}></div>: <div className={classes.ml25}>
                                    <SubTitle title={integrationData?.phone} /></div>
                            </div>
                            <Divider className={classes.mt10} />
                            <div className={classes.margin}></div>
                            <SubTitle title="Configuration Details :" />
                            <div className={classes.inlineDisplay}>
                                <SubTitle1 title="API Key" />
                                <div className={classes.mr25}></div>: <div className={classes.ml25}>
                                    <SubTitle title={integrationData?.api_key} /></div>
                            </div>
                            <div className={classes.inlineDisplay}>
                                <SubTitle1 title="College Name" />
                                <div className={classes.mr25}></div>: <div className={classes.ml25}>
                                    <SubTitle title={integrationData?.college_name} /></div>
                            </div>
                            <div className={classes.inlineDisplay}>
                                <SubTitle1 title="Configured Date" />
                                <div className={classes.mr25}></div>: <div className={classes.ml25}>
                                    <SubTitle title={integrationData?.created_date} /></div>
                            </div>
                            <div className={classes.inlineDisplay}>
                                <SubTitle1 title="Moodle URL" />
                                <div className={classes.mr25}></div>: <div className={classes.ml25}>
                                    <SubTitle title={integrationData?.lms_url} /></div>
                            </div>
                        </CardView>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
};

const mapStateToProps = (state) => ({
    integrationData: state?.adminIntegrationData?.integrationTypeData,
    isLoading: state?.adminIntegrationData?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetIntegrationDetailData: (apiUrl) => dispatch(GetIntegrationDetailData(apiUrl)),
    };
};


Moodle.layout = Admin;

Moodle.propTypes = {
    GetIntegrationDetailData: PropTypes.func.isRequired,
    integrationData: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Moodle);
