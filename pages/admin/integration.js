import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Skeleton, TextField } from '@mui/material';
import Admin from './../../layouts/Admin';
import { BreadCrumb, CardInfoView, MainHeading, CreateDrawer } from './../../components';
import { GetIntegrationList } from '../../redux/action/admin/AdminAction';
import END_POINTS from '../../utils/EndPoints';
import MoodleForm from './form/MoodleForm';
import CanvasForm from './form/CanvasForm';
import BlackboardForm from './form/BlackboardForm';

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
    const [showMoodle, setShowMoodle] = useState(false);
    const [showCanvas, setShowCanvas] = useState(false);
    const [showBlackboard, setShowBlackboard] = useState(false);
    const [checked, setChecked] = useState({
        MOODLE: integrationData && integrationData[0]?.lmsconfigured,
        CANVAS: integrationData && integrationData[1]?.lmsconfigured,
        BLACKBOARD: integrationData && integrationData[2]?.lmsconfigured,
    });


    useEffect(() => {
        GetIntegrationList(END_POINTS.ADMIN_INTEGRATION_DATA);
    }, []);

    useEffect(() => {
        let lmsData = integrationData && integrationData?.map((item) => {
            if (item.lms === 'MOODLE') {
                item['img'] = '/img/lms/moodle.svg';
                item['description'] = 'Moodle Plug-In Integration';
                item['path'] = '/admin/integration/moodle';
            }
            if (item.lms === 'CANVAS') {
                item['img'] = '/img/lms/canvas.svg';
                item['description'] = 'Canvas LTI Integration';
                item['path'] = '/admin/integration/canvas';
            }
            if (item.lms === 'BLACKBOARD') {
                item['img'] = '/img/lms/blackboard.svg';
                item['description'] = 'Blackboard LTI Integration';
                item['path'] = '/admin/integration/blackBoard';
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
        console.log("moodle", showMoodle)
        if (event.target.name === 'MOODLE') {
            setShowMoodle(true)
        } else if (event.target.name === 'CANVAS') {
            setShowCanvas(true)
        } else if (event.target.name === 'BLACKBOARD') {
            setShowBlackboard(true)
        }
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
                >
                    <MoodleForm />
                </CreateDrawer>
            }
            { showCanvas &&
                <CreateDrawer
                    isShowAddIcon={ false }
                    showDrawer={ showCanvas }
                >
                    <CanvasForm />
                </CreateDrawer>
            }
            { showBlackboard &&
                <CreateDrawer
                    isShowAddIcon={ false }
                    showDrawer={ showBlackboard }
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