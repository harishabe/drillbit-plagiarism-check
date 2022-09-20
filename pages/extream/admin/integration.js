import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Skeleton, TextField } from '@mui/material';
import Admin from './../../../layouts/Admin';
import { BreadCrumb, CardInfoView, MainHeading, CreateDrawer } from './../../../components';
import { GetIntegrationList } from '../../../redux/action/admin/AdminAction';
import END_POINTS from '../../../utils/EndPoints';
import MoodleForm from './form/MoodleForm';
import CanvasForm from './form/CanvasForm';
import BlackboardForm from './form/BlackboardForm';
import {
    ADMIN_INTEGRATION_MOODLE,
    ADMIN_INTEGRATION_CANVAS,
    ADMIN_INTEGRATION_BLACKBOARD,
    ADMIN_INTEGRATION_MOODLE_IMG,
    ADMIN_INTEGRATION_CANVAS_IMG,
    ADMIN_INTEGRATION_BLACKBOARD_IMG,
    ADMIN_INTEGRATION_MOODLE_DESCRIPTION,
    ADMIN_INTEGRATION_CANVAS_DESCRIPTION,
    ADMIN_INTEGRATION_BLACKBOARD_DESCRIPTION,
    ADMIN_INTEGRATION_MOODLE_PATH,
    ADMIN_INTEGRATION_CANVAS_PATH,
    ADMIN_INTEGRATION_BLACKBOARD_PATH,
} from '../../../constant/data/Integration'
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl'

const IntegrationBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/extream/admin/dashboard',
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
    isLoading,
}) => {

    const [lmsData, setLmsData] = useState([]);
    const [showMoodle, setShowMoodle] = useState(false);
    const [showCanvas, setShowCanvas] = useState(false);
    const [showBlackboard, setShowBlackboard] = useState(false);
    const [checked, setChecked] = useState({
        MOODLE: integrationData && integrationData[0]?.lmsconfigured,
        CANVAS: integrationData && integrationData[1]?.lmsconfigured,
        BLACKBOARD: integrationData && integrationData[2]?.lmsconfigured,
    });


    useEffect(() => {
        GetIntegrationList(BASE_URL_EXTREM + END_POINTS.ADMIN_INTEGRATION_DATA);
    }, []);

    useEffect(() => {
        let lmsData = integrationData && integrationData?.map((item) => {
            if (item.lms === ADMIN_INTEGRATION_MOODLE) {
                item['img'] = ADMIN_INTEGRATION_MOODLE_IMG;
                item['description'] = ADMIN_INTEGRATION_MOODLE_DESCRIPTION;
                item['path'] = ADMIN_INTEGRATION_MOODLE_PATH;
                item['type'] = 'Moodle';
            }
            if (item.lms === ADMIN_INTEGRATION_CANVAS) {
                item['img'] = ADMIN_INTEGRATION_CANVAS_IMG;
                item['description'] = ADMIN_INTEGRATION_CANVAS_DESCRIPTION;
                item['path'] = ADMIN_INTEGRATION_CANVAS_PATH;
                item['type'] = 'Canvas';
            }
            if (item.lms === ADMIN_INTEGRATION_BLACKBOARD) {
                item['img'] = ADMIN_INTEGRATION_BLACKBOARD_IMG;
                item['description'] = ADMIN_INTEGRATION_BLACKBOARD_DESCRIPTION;
                item['path'] = ADMIN_INTEGRATION_BLACKBOARD_PATH;
                item['type'] = 'Blackboard'
            }
            return item;
        })
        setLmsData(lmsData);
    }, [integrationData]);

    const handleConfig = (event) => {
        setChecked({
            ...checked,
            [event.target.name]: event.target.checked,
        })
        if (event.target.name === 'MOODLE') {
            setShowMoodle(true)
        } else if (event.target.name === 'CANVAS') {
            setShowCanvas(true)
        } else if (event.target.name === 'BLACKBOARD') {
            setShowBlackboard(true)
        }
    }

    const handleCloseDrawer = (drawerClose) => {
        setShowMoodle(drawerClose);
        setShowCanvas(drawerClose);
        setShowBlackboard(drawerClose);
    }

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

            <MainHeading title={ `Integrations (${integrationData?.length === undefined ? 0 : integrationData?.length})` } />

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
                                handleConfig={ handleConfig }
                                checked={ checked }
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

            { showMoodle &&
                <CreateDrawer
                    isShowAddIcon={ false }
                    showDrawer={ showMoodle }
                    handleDrawerClose={ handleCloseDrawer }
                >
                    <MoodleForm />
                </CreateDrawer>
            }
            { showCanvas &&
                <CreateDrawer
                    isShowAddIcon={ false }
                    showDrawer={ showCanvas }
                    handleDrawerClose={ handleCloseDrawer }
                >
                    <CanvasForm />
                </CreateDrawer>
            }
            { showBlackboard &&
                <CreateDrawer
                    isShowAddIcon={ false }
                    showDrawer={ showBlackboard }
                    handleDrawerClose={ handleCloseDrawer }
                >
                    <BlackboardForm />
                </CreateDrawer>
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