import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import { Grid, Box } from '@mui/material/Grid';
import Admin from './../../../layouts/Admin';
import {
    BreadCrumb,
    MainHeading,
} from '../../../components';
import { GetIntegrationDetailData } from '../../../redux/action/admin/AdminAction';
import END_POINTS from '../../../utils/EndPoints';
import IntegrationTypeDetail from './IntegrationTypeDetail';

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
                        {
                            integrationData && <IntegrationTypeDetail
                                routerData={router?.query}
                                integrationData={integrationData}
                            />
                        }
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
