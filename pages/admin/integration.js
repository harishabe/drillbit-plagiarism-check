import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Skeleton, TextField } from '@mui/material';
import Admin from './../../layouts/Admin';
import { BreadCrumb, CardInfoView, MainHeading } from './../../components';
import { GetIntegrationList } from '../../redux/action/admin/AdminAction';
import END_POINTS from '../../utils/EndPoints';

const IntegrationBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/admin/dashboard',
        active: false,
    },
    {
        name: 'Integrations',
        link: '',
        active: true,
    },
];

const Integration = ({
    GetIntegrationList,
    integrationData,
    isLoading
}) => {

    const [lmsData, setLmsData] = useState([]);
    useEffect(() => {
        GetIntegrationList(END_POINTS.ADMIN_INTEGRATION_DATA);
    }, []);

    useEffect(() => {
        let lmsData = integrationData && integrationData?.map((item) => {
            if (item.lms === 'MOODLE') {
                item['img'] = '/img/lms/moodle.svg';
                item['description'] = 'Moodle is a software package for producing Internet-based courses and web sites';
                item['path'] = '/admin/integration/moodle';
            }
            if (item.lms === 'CANVAS') {
                item['img'] = '/img/lms/canvas.svg';
                item['description'] = 'The Canvas LMS is the world\'s fastest growing learning management system.';
                item['path'] = '/admin/integration/canvas';
            }
            if (item.lms === 'BLACKBOARD') {
                item['img'] = '/img/lms/blackboard.svg';
                item['description'] = 'Blackboard Learn is a web-based virtual learning environment and learning management system';
                item['path'] = '/admin/integration/blackBoard';
            }
            return item;
        })
        setLmsData(lmsData);
    }, [integrationData]);

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={10}>
                        <BreadCrumb item={IntegrationBreadCrumb} />
                    </Grid>
                    <Grid item md={2} xs={2}>
                    </Grid>
                </Grid>
            </Box>

            <MainHeading title={`Integrations (${integrationData?.length})`} />

            {isLoading ? <Grid container spacing={2}>
                <Grid item md={4} xs={12}><Skeleton /></Grid>
                <Grid item md={4} xs={12}><Skeleton /></Grid>
                <Grid item md={4} xs={12}><Skeleton /></Grid>
            </Grid> :
                <Grid container spacing={2}>
                    {lmsData?.map((item, index) => (
                        <Grid key={index} item md={4} xs={12}>
                            <CardInfoView
                                item={item}
                                isTimer={false}
                                isKnowMore={true}
                                isConfig={true}
                                isAvatar={false}
                                isImage={true}
                                path=''
                            />
                        </Grid>
                    ))}
                </Grid>
            }

        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    integrationData: state?.adminIntegrationData?.integrationData,
    isLoading: state?.adminIntegrationData?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetIntegrationList: (apiUrl) => dispatch(GetIntegrationList(apiUrl)),
    };
};

Integration.layout = Admin;

Integration.propTypes = {
    GetIntegrationList: PropTypes.func.isRequired,
    integrationData: PropTypes.object,
    isLoading: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Integration);