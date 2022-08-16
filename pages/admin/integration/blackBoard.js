import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import { Grid, Box, Skeleton } from '@mui/material';
import Admin from './../../../layouts/Admin';
import styled from 'styled-components';
import {
    BreadCrumb,
    CreateDrawer
} from '../../../components';
import { GetIntegrationDetailData } from '../../../redux/action/admin/AdminAction';
import END_POINTS from '../../../utils/EndPoints';
import IntegrationTypeDetail from './IntegrationTypeDetail';
import BlackboardForm from '../form/BlackboardForm';

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

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
`;

const BlackBoard = ({
    GetIntegrationDetailData,
    integrationData,
    isLoading,
    isLoadingUpload
}) => {

    const router = useRouter();
    const [form, setForm] = useState(false);

    useEffect(() => {
        GetIntegrationDetailData(END_POINTS.ADMIN_BLACKBOARD_INTEGRATION);
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

                <AddButtonBottom>
                    <CreateDrawer
                        title="Blackboard Configuration"
                        isShowAddIcon={ true }
                    >
                        <BlackboardForm />
                    </CreateDrawer>
                </AddButtonBottom>

                { form &&
                    <CreateDrawer
                        title="Canvas Configuration"
                        isShowAddIcon={ false }
                        showDrawer={ form }
                    >
                        <BlackboardForm
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

BlackBoard.layout = Admin;

BlackBoard.propTypes = {
    GetIntegrationDetailData: PropTypes.func.isRequired,
    integrationData: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(BlackBoard);