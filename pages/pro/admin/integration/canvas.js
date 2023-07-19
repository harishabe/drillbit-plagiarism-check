import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { Grid, Box, Skeleton } from '@mui/material';
import ProAdmin from './../../../../layouts/ProAdmin';
import {
    BreadCrumb,
    CreateDrawer
} from '../../../../components';
import { GetIntegrationDetailData } from '../../../../redux/action/admin/AdminAction';
import END_POINTS_PRO from '../../../../utils/EndPointPro';
import IntegrationTypeDetail from '../../../extream/admin/integration/IntegrationTypeDetail';
import CanvasForm from '../form/CanvasForm';
import { BASE_URL_PRO } from '../../../../utils/BaseUrl';

const Canvas = ({
    GetIntegrationDetailData,
    integrationData,
    isLoading,
    isLoadingUpload
}) => {

    const router = useRouter();
    const [form, setForm] = useState(false);

    const InstructorBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/pro/admin/dashboard',
            active: false,
        },
        {
            name: 'Integrations',
            link: '/pro/admin/integration',
            active: false,
        },
        {
            name: `${router?.query?.integration} details`,
            link: '',
            active: true,
        },
    ];


    useEffect(() => {
        GetIntegrationDetailData(BASE_URL_PRO + END_POINTS_PRO.ADMIN_CANVAS_INTEGRATION);
    }, []);

    const handleConfig = () => {
        setForm(true);
    };

    const handleDrawerClose = (drawerClose) => {
        setForm(drawerClose);
    };

    const closeDrawerOnSuccess = (drawerClose) => {
        setForm(drawerClose);
    };

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
                                <IntegrationTypeDetail
                                    routerData={ router?.query }
                                    integrationData={ integrationData }
                                    handleConfig={ handleConfig }
                                    isCanvasTrue={ true }
                                />
                            }
                        </Grid>
                    }
                </Grid>

                { form &&
                    <CreateDrawer
                        title="Canvas Configuration"
                        isShowAddIcon={ false }
                        showDrawer={ form }
                        handleDrawerClose={ handleDrawerClose }
                        handleCloseDrawer={ closeDrawerOnSuccess }
                    >
                        <CanvasForm
                            editData={ integrationData }
                            isLoadingUpload={ isLoadingUpload }
                        />
                    </CreateDrawer>
                }
            </Box>
        </React.Fragment>
    );
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

Canvas.layout = ProAdmin;

Canvas.propTypes = {
    GetIntegrationDetailData: PropTypes.func.isRequired,
    integrationData: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
