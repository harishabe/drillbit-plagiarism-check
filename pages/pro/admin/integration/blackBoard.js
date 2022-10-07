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
import BlackboardForm from '../form/BlackboardForm';
import { BASE_URL_PRO } from '../../../../utils/BaseUrl';

const BlackBoard = ({
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
        GetIntegrationDetailData(BASE_URL_PRO + END_POINTS_PRO.ADMIN_BLACKBOARD_INTEGRATION);
    }, []);

    const handleConfig = () => {
        setForm(true);
    };

    const handleCloseDrawer = (drawerClose) => {
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
                                integrationData &&
                                <IntegrationTypeDetail
                                    routerData={ router?.query }
                                    integrationData={ integrationData }
                                    handleConfig={ handleConfig }
                                    isBlackboardTrue={ true }
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
                        handleDrawerClose={ handleCloseDrawer }
                    >
                        <BlackboardForm
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

BlackBoard.layout = ProAdmin;

BlackBoard.propTypes = {
    GetIntegrationDetailData: PropTypes.func.isRequired,
    integrationData: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(BlackBoard);