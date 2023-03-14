import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SuperAdmin from '../../layouts/SuperAdmin';
import { BreadCrumb, TabMenu } from '../../components';
import Extreme from './reseller/Extreme';
import Pro from './reseller/Pro';

const resellerExtreme = ({
    pageDetailsInstructor,
    pageDetailsStudent,
    isLoadingExtInsList,
    isLoadingExtStuList,
}) => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(0);
    const [adminName, setAdminName] = useState('');

    useEffect(() => {
        if (router.isReady) {
            setAdminName(router.query.name);
        }
    }, [router.isReady]);

    const SuperAdminBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/super/dashboard',
            active: false,
        },
        {
            name: 'Reseller',
            link: '/super/resellerproduct',
            active: false,
        },
        {
            name: adminName,
            link: '',
            active: true,
        },
    ];

    const handleAPI = (value) => {
        setActiveTab(value);
    };

    const ExtremeComponent = activeTab === 0 && <Extreme
        pageDetailsInstructor={ pageDetailsInstructor }
        isLoadingExtInsList={ isLoadingExtInsList }
        activeTab={ activeTab }
    />;

    const ProComponent = activeTab === 1 && <Pro
        pageDetailsStudent={ pageDetailsStudent }
        isLoadingExtStuList={ isLoadingExtStuList }
        activeTab={ activeTab }
    />;

    const componentList = [
        ExtremeComponent,
        ProComponent
    ];

    const tabMenu = [
        {
            label: `Extreme(${pageDetailsInstructor?.totalElements !== undefined ? pageDetailsInstructor?.totalElements : 0})`,
        },
        {
            label: `Pro${pageDetailsStudent?.totalElements !== undefined && pageDetailsStudent?.totalElements > 0 ? '(' + pageDetailsStudent?.totalElements + ')' : ''}`,
        }
    ];

    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 10 } xs={ 12 }>
                        <BreadCrumb item={ SuperAdminBreadCrumb } />
                    </Grid>
                </Grid>
            </Box>

            <TabMenu
                menuButton={ tabMenu }
                components={ componentList }
                handleAPI={ handleAPI }
            />
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    pageDetailsInstructor: state?.superAdmin?.extInsList?.page,
    pageDetailsStudent: state?.superAdmin?.extStuList?.page,
    isLoadingExtInsList: state?.superAdmin?.isLoadingExtInsList,
    isLoadingExtStuList: state?.superAdmin?.isLoadingExtStuList,
});

resellerExtreme.layout = SuperAdmin;

export default connect(mapStateToProps, {})(resellerExtreme);