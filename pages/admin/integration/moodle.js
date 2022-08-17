import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import { Grid, Box, Skeleton } from '@mui/material';
import Admin from './../../../layouts/Admin';
import {
    BreadCrumb,
    CreateDrawer
} from '../../../components';
import { GetIntegrationDetailData } from '../../../redux/action/admin/AdminAction';
import END_POINTS from '../../../utils/EndPoints';
import IntegrationTypeDetail from './IntegrationTypeDetail';
import MoodleForm from '../form/MoodleForm';

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
    integrationData,
    isLoading,
    isLoadingUpload
}) => {

    const router = useRouter();
    const [form, setForm] = useState(false);

    useEffect(() => {
        GetIntegrationDetailData(END_POINTS.ADMIN_MOODLE_INTEGRATION);
    }, []);

    const handleConfig = () => {
        setForm(true)
    }

    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 10 } xs={ 10 }>
                        <BreadCrumb item={ InstructorBreadCrumb } />
                    </Grid>
                </Grid>
                <Grid container spacing={ 1 }>
                    { isLoading ? <Grid container spacing={ 2 }>
                        <Grid item md={ 4 } xs={ 12 }><Skeleton /></Grid>
                        <Grid item md={ 4 } xs={ 12 }><Skeleton /></Grid>
                        <Grid item md={ 4 } xs={ 12 }><Skeleton /></Grid>
                    </Grid> :
                        <Grid item md={ 12 } xs={ 12 }>
                            {
                                integrationData && <IntegrationTypeDetail
                                    routerData={ router?.query }
                                    integrationData={ integrationData }
                                    handleConfig={ handleConfig }
                                    isMoodleTrue={ true }
                                />
                            }
                        </Grid>
                    }
                </Grid>

                { form &&
                    <CreateDrawer
                        title="Moodle Configuration"
                        isShowAddIcon={ false }
                        showDrawer={ form }
                    >
                        <MoodleForm
                            editData={ integrationData }
                            isLoadingUpload={ isLoadingUpload }
                        />
                    </CreateDrawer>
                }
            </Box>
        </React.Fragment>
    )
};

const mapStateToProps = (state) => ({
    integrationData: state?.adminIntegrationData?.integrationTypeData,
    isLoading: state?.adminIntegrationData?.isLoading,
    isLoadingUpload: state?.adminIntegrationData?.integrationTypeData?.isLoadingUpload,
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
