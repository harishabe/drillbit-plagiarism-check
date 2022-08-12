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
import { GetIntegrationList } from '../../../redux/action/admin/AdminAction';
import END_POINTS from '../../../utils/EndPoints';
import { Divider } from '@mui/material';

const useStyles = makeStyles({
    margin:{
        margin: '25px 0px'
    },
    inlineDisplay:{
        display:'flex'
    },
    mr25:{
        marginRight: '25px'
    },
    ml25:{
        marginLeft: '25px'
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
    GetIntegrationList
}) => {

    const classes = useStyles();

    const router = useRouter();

    useEffect(() => {
        GetIntegrationList(END_POINTS.ADMIN_MOODLE_INTEGRATION);
        console.log('router', router);
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
                                Change Configuration
                            </Button>
                            <Divider />
                            <div className={classes.margin}></div>
                            <SubTitle title="Technical Contact" />
                            <div className={classes.inlineDisplay}>
                                <SubTitle1 title="Name" /> <div className={classes.mr25}></div>: <div className={classes.ml25}><SubTitle title="Harisha" /></div>
                            </div>
                        </CardView>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
};

const mapStateToProps = (state) => ({
    integrationData: state?.adminIntegrationData?.integrationData,
    isLoading: state?.adminIntegrationData?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetIntegrationList: (apiUrl) => dispatch(GetIntegrationList(apiUrl)),
    };
};


Moodle.layout = Admin;

Moodle.propTypes = {
    GetIntegrationList: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Moodle);
