import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Skeleton } from '@mui/material';
import Admin from './../../../layouts/Admin';
import { DeleteWarningIcon } from '../../../assets/icon';
import { BreadCrumb, CardInfoView, MainHeading, CreateDrawer, WarningDialog } from './../../../components';
import { GetIntegrationList, GetGoogleLms, DeleteIntegration } from '../../../redux/action/admin/AdminAction';
import END_POINTS from '../../../utils/EndPoints';
import MoodleForm from './form/MoodleForm';
import CanvasForm from './form/CanvasForm';
import BlackboardForm from './form/BlackboardForm';
import BrightSpaceForm from './form/BrightSpaceForm';
import MoodleLTIForm from './form/MoodleLTIForm';
import {
    ADMIN_INTEGRATION_MOODLE,
    ADMIN_INTEGRATION_CANVAS,
    ADMIN_INTEGRATION_BLACKBOARD,
    ADMIN_INTEGRATION_GOOGLECLASSROOM,
    ADMIN_INTEGRATION_BRIGHTSPACE,
    ADMIN_INTEGRATION_MOODLE_LTI,
    ADMIN_INTEGRATION_MOODLE_IMG,
    ADMIN_INTEGRATION_CANVAS_IMG,
    ADMIN_INTEGRATION_BLACKBOARD_IMG,
    ADMIN_INTEGRATION_GOOGLECLASSROOM_IMG,
    ADMIN_INTEGRATION_BRIGHTSPACE_IMG,
    ADMIN_INTEGRATION_MOODLE_LTI_IMG,
    ADMIN_INTEGRATION_MOODLE_DESCRIPTION,
    ADMIN_INTEGRATION_CANVAS_DESCRIPTION,
    ADMIN_INTEGRATION_BLACKBOARD_DESCRIPTION,
    ADMIN_INTEGRATION_GOOGLECLASSROOM_DESCRIPTION,
    ADMIN_INTEGRATION_BRIGHTSPACE_DESCRIPTION,
    ADMIN_INTEGRATION_MOODLE_LTI_DESCRIPTION,
    ADMIN_INTEGRATION_MOODLE_PATH,
    ADMIN_INTEGRATION_CANVAS_PATH,
    ADMIN_INTEGRATION_BLACKBOARD_PATH,
    ADMIN_INTEGRATION_GOOGLECLASSROOM_PATH,
    ADMIN_INTEGRATION_BRIGHTSPACE_PATH,
    ADMIN_INTEGRATION_MOODLE_LTI_PATH,
} from '../../../constant/data/Integration';
import {
    INTEGRATION_TYPES,
    WARNING_MESSAGES
} from '../../../constant/data/Constant';
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';

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
    GetGoogleLms,
    googleConfigData,
    integrationData,
    isLoading,
    DeleteIntegration
}) => {
    const router = useRouter();
    const [lmsData, setLmsData] = useState([]);
    const [showMoodle, setShowMoodle] = useState(false);
    const [showCanvas, setShowCanvas] = useState(false);
    const [showBlackboard, setShowBlackboard] = useState(false);
    const [showGoogleClassroom, setShowGoogleClassroom] = useState(false);
    const [showBrightSpace, setShowBrightSpace] = useState(false);
    const [showMoodleLti, setShowMoodleLti] = useState(false);
    const [checked, setChecked] = useState({
        MOODLE: integrationData && integrationData[0]?.lmsconfigured,
        CANVAS: integrationData && integrationData[1]?.lmsconfigured,
        BLACKBOARD: integrationData && integrationData[2]?.lmsconfigured,
        BRIGHTSPACE: integrationData && integrationData[3]?.lmsconfigured,
        MOODLE_LTI: integrationData && integrationData[4]?.lmsconfigured,
    });
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [selectedIntegrationType, setSelectedIntegrationType] = useState('');

    useEffect(() => {
        GetIntegrationList(BASE_URL_EXTREM + END_POINTS.ADMIN_INTEGRATION_DATA);
    }, []);

    useEffect(() => {
        if (showGoogleClassroom) {
            router.push({ pathname: '/extream/admin/integration/google/googleAuth' });
            //GetGoogleLms()
        }
    }, [showGoogleClassroom]);

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
                item['type'] = 'Blackboard';
            }
            if (item.lms === ADMIN_INTEGRATION_GOOGLECLASSROOM) {
                item['img'] = ADMIN_INTEGRATION_GOOGLECLASSROOM_IMG;
                item['description'] = ADMIN_INTEGRATION_GOOGLECLASSROOM_DESCRIPTION;
                item['path'] = ADMIN_INTEGRATION_GOOGLECLASSROOM_PATH;
                item['type'] = 'Google Classroom';
            }
            if (item.lms === ADMIN_INTEGRATION_BRIGHTSPACE) {
                item['img'] = ADMIN_INTEGRATION_BRIGHTSPACE_IMG;
                item['description'] = ADMIN_INTEGRATION_BRIGHTSPACE_DESCRIPTION;
                item['path'] = ADMIN_INTEGRATION_BRIGHTSPACE_PATH;
                item['type'] = INTEGRATION_TYPES.BRIGHTSPACE;
            }
            if (item.lms === ADMIN_INTEGRATION_MOODLE_LTI) {
                item['img'] = ADMIN_INTEGRATION_MOODLE_LTI_IMG;
                item['description'] = ADMIN_INTEGRATION_MOODLE_LTI_DESCRIPTION;
                item['path'] = ADMIN_INTEGRATION_MOODLE_LTI_PATH;
                item['type'] = INTEGRATION_TYPES.MOODLE_LTI;
            }
            return item;
        });
        setLmsData(lmsData);
    }, [integrationData]);

    const handleConfig = (event) => {
        setChecked({
            ...checked,
            [event.target.name]: event.target.checked,
        });
        if (event.target.name === 'MOODLE') {
            setShowMoodle(true);
        } else if (event.target.name === 'CANVAS') {
            setShowCanvas(true);
        } else if (event.target.name === 'BLACKBOARD') {
            setShowBlackboard(true);
        } else if (event.target.name === 'GOOGLECLASSROOM') {
            setShowGoogleClassroom(true);
        } else if (event.target.name === 'BRIGHTSPACE') {
            setShowBrightSpace(true);
        } else if (event.target.name === 'MOODLE_LTI') {
            setShowMoodleLti(true);
        }
    };

    const handleCloseDrawer = (drawerClose) => {
        setShowMoodle(drawerClose);
        setShowCanvas(drawerClose);
        setShowBlackboard(drawerClose);
        setShowBrightSpace(drawerClose);
        setShowMoodleLti(drawerClose);
    };

    const handleDeleteIntegration = (integrationType) => {
        setShowDeleteWarning(true);
        setSelectedIntegrationType(integrationType);
    };

    const handleDeleteYesWarning = () => {
        if (selectedIntegrationType === INTEGRATION_TYPES.CANVAS) {
            DeleteIntegration(BASE_URL_EXTREM + END_POINTS.INTEGRATION_DELETE_CANVAS);
            setShowDeleteWarning(false);
        } else if (selectedIntegrationType === INTEGRATION_TYPES.BLACKBOARD) {
            DeleteIntegration(BASE_URL_EXTREM + END_POINTS.INTEGRATION_DELETE_BLACKBOARD);
            setShowDeleteWarning(false);
        } else if (selectedIntegrationType === INTEGRATION_TYPES.BRIGHTSPACE) {
            DeleteIntegration(BASE_URL_EXTREM + END_POINTS.INTEGRATION_DELETE_BRIGHTSPACE);
            setShowDeleteWarning(false);
        } else if (selectedIntegrationType === INTEGRATION_TYPES.MOODLE_LTI) {
            DeleteIntegration(BASE_URL_EXTREM + END_POINTS.INTEGRATION_DELETE_MOODLE_LTI);
            setShowDeleteWarning(false);
        }
    };

    const handleDeleteCloseWarning = () => {
        setShowDeleteWarning(false);
    };

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

            <MainHeading title={`Integrations (${integrationData?.length === undefined ? 0 : integrationData?.length})`} />

            {isLoading ? <Grid container spacing={2}>
                <Grid item md={4} xs={12}><Skeleton /></Grid>
                <Grid item md={4} xs={12}><Skeleton /></Grid>
                <Grid item md={4} xs={12}><Skeleton /></Grid>
            </Grid> :
                <Grid container spacing={2}>
                    {lmsData?.map((item, index) => (
                        (item.lms === 'GOOGLECLASSROOM')  ? '' :
                            <Grid key={index} item md={4} xs={12}>
                                <CardInfoView
                                    item={item}
                                    handleConfig={handleConfig}
                                    handleDeleteIntegrations={handleDeleteIntegration}
                                    checked={checked}
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

            {showMoodle &&
                <CreateDrawer
                    isShowAddIcon={false}
                    showDrawer={showMoodle}
                    handleDrawerClose={handleCloseDrawer}
                >
                    <MoodleForm />
                </CreateDrawer>
            }
            {showCanvas &&
                <CreateDrawer
                    isShowAddIcon={false}
                    showDrawer={showCanvas}
                    handleDrawerClose={handleCloseDrawer}
                >
                    <CanvasForm />
                </CreateDrawer>
            }
            {showBlackboard &&
                <CreateDrawer
                    isShowAddIcon={false}
                    showDrawer={showBlackboard}
                    handleDrawerClose={handleCloseDrawer}
                >
                    <BlackboardForm />
                </CreateDrawer>
            }
            { showBrightSpace &&
                <CreateDrawer
                    isShowAddIcon={ false }
                    showDrawer={ showBrightSpace }
                    handleDrawerClose={ handleCloseDrawer }
                >
                    <BrightSpaceForm />
                </CreateDrawer>
            }
            { showMoodleLti &&
                <CreateDrawer
                    isShowAddIcon={ false }
                    showDrawer={ showMoodleLti }
                    handleDrawerClose={ handleCloseDrawer }
                >
                    <MoodleLTIForm />
                </CreateDrawer>
            }

            {
                showDeleteWarning &&
                <WarningDialog
                    message={WARNING_MESSAGES.DELETE}
                    handleYes={handleDeleteYesWarning}
                    warningIcon={<DeleteWarningIcon />}
                    handleNo={handleDeleteCloseWarning}
                    isOpen={true}
                />
            }
            {showGoogleClassroom && <a href={googleConfigData}>Google</a>}
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    integrationData: state?.adminIntegrationData?.integrationData,
    googleConfigData: state?.adminIntegrationData?.googleConfigData,
    isLoading: state?.adminIntegrationData?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetIntegrationList: (apiUrl) => dispatch(GetIntegrationList(apiUrl)),
        GetGoogleLms: () => dispatch(GetGoogleLms()),
        DeleteIntegration: (apiUrl) => dispatch(DeleteIntegration(apiUrl))
    };
};

Integration.layout = Admin;

Integration.propTypes = {
    GetIntegrationList: PropTypes.func.isRequired,
    integrationData: PropTypes.object,
    isLoading: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Integration);