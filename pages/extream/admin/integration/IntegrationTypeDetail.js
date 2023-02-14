import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Button, Divider } from '@mui/material';
import { ConfigIcon } from '../../../../assets/icon';
import {
    CardView,
    SubHeading,
    MainHeading,
    SubTitle,
    CommonTable
} from '../../../../components';
import { formatDate } from '../../../../utils/RegExp';

const useStyles = makeStyles({
    margin: {
        margin: '15px 0px'
    },
    inlineDisplay: {
        display: 'flex'
    },
    mr25: {
        marginRight: '25px'
    },
    ml25: {
        marginLeft: '25px'
    },
    ml10: {
        marginLeft: '10px'
    },
    mt10: {
        marginTop: '10px'
    }
});

const columns = [
    { id: 'name', label: 'Name' },
    { id: 'details', label: 'Details' },
];

function createData(name, details) {
    return { name, details };
};

const IntegrationTypeDetail = ({
    isMoodleTrue,
    isCanvasTrue,
    isBlackboardTrue,
    isBrightspaceTrue,
    isMoodleLtiTrue,
    integrationData,
    routerData,
    handleConfig
}) => {

    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [technical, setTechnical] = useState([]);

    const body =
        <>
            <Button onClick={ handleConfig } className={ classes.margin } variant="contained">
                <ConfigIcon /> <span className={ classes.ml10 }>Change Configuration</span>
            </Button>
            <Divider className={ classes.mt10 } />
            <div className={ classes.margin }></div>

            <CommonTable
                isCheckbox={ false }
                tableHeader={ columns }
                tableData={ rows }
                charLength={ 50 }
                path=''
            />
        </>

    useEffect(() => {
        if (routerData?.integration === 'Moodle') {
            if (integrationData?.created_date !== undefined) {
                let moodleDate = formatDate(integrationData?.created_date);
                let row = [
                    createData('API Key', integrationData?.api_key),
                    createData('College Name', integrationData?.college_name),
                    createData('Configured Date', moodleDate),
                    createData('Moodle URL', integrationData?.lms_url),
                ];
                let tech = [
                    createData('Name', integrationData?.name),
                    createData('Email Address', integrationData?.email),
                    createData('Phone Number', integrationData?.phone),
                ];
                setRows([...row]);
                setTechnical([...tech]);
            }
        } else if (routerData?.integration === 'Canvas') {
            if (integrationData?.creation_time !== undefined) {
                let canvasDate = formatDate(integrationData?.creation_time);
                let row = [
                    createData('Access end point', integrationData?.access_end_point),
                    createData('Authentication end point', integrationData?.auth_end_point),
                    createData('Configured Date', canvasDate),
                    createData('Client id', integrationData?.client_id),
                    createData('College Name', integrationData?.college_name),
                    createData('Keyset end point', integrationData?.keyset_end_point),
                    createData('Email Address', integrationData?.mail_id),
                    createData('Method', integrationData?.method),
                    createData('Platform url', integrationData?.platform_url),
                ];
                setRows([...row]);
            }
        } else if (routerData?.integration === 'Blackboard') {
            if (integrationData?.creation_time !== undefined) {
                let blackBoardDate = integrationData?.creation_time;
                let row = [
                    createData('Access end point', integrationData?.access_end_point),
                    createData('Authentication end point', integrationData?.auth_end_point),
                    createData('Configured Date', blackBoardDate),
                    createData('Client id', integrationData?.client_id),
                    createData('College Name', integrationData?.college_name),
                    createData('Keyset end point', integrationData?.keyset_end_point),
                    createData('Email Address', integrationData?.mail_id),
                    createData('Method', integrationData?.method),
                    createData('Platform url', integrationData?.platform_url),
                ];
                setRows([...row]);
            }
        } else if (routerData?.integration === 'Brightspace') {
            if (integrationData?.creation_time !== undefined) {
                let blackBoardDate = integrationData?.creation_time;
                let row = [
                    createData('Access end point', integrationData?.access_end_point),
                    createData('Authentication end point', integrationData?.auth_end_point),
                    createData('Configured Date', blackBoardDate),
                    createData('Client id', integrationData?.client_id),
                    createData('College Name', integrationData?.college_name),
                    createData('Keyset end point', integrationData?.keyset_end_point),
                    createData('Email Address', integrationData?.mail_id),
                    createData('Method', integrationData?.method),
                    createData('Platform url', integrationData?.platform_url),
                ];
                setRows([...row]);
            }
        } else if (routerData?.integration === 'Moodle LTI') {
            if (integrationData?.creation_time !== undefined) {
                let blackBoardDate = integrationData?.creation_time;
                let row = [
                    createData('Access end point', integrationData?.access_end_point),
                    createData('Authentication end point', integrationData?.auth_end_point),
                    createData('Configured Date', blackBoardDate),
                    createData('Client id', integrationData?.client_id),
                    createData('College Name', integrationData?.college_name),
                    createData('Keyset end point', integrationData?.keyset_end_point),
                    createData('Email Address', integrationData?.mail_id),
                    createData('Method', integrationData?.method),
                    createData('Platform url', integrationData?.platform_url),
                ];
                setRows([...row]);
            }
        }
    }, [integrationData]);
    return (
        <>
            { isMoodleTrue &&
                <>
                <MainHeading title={ 'Moodle Plugin Setup' } />
                    <CardView>
                    <SubHeading title={ 'Moodle Plug-in – Configured' } />
                    { body }
                    </CardView>

                <div className={ classes.margin }></div>
                    <CardView>
                    <div className={ classes.margin }></div>
                        <SubTitle title="Technical Contact Details :" />
                        <CommonTable
                        isCheckbox={ false }
                        tableHeader={ columns }
                        tableData={ technical }
                        charLength={ 50 }
                            path=''
                        />
                    </CardView>
                </>
            }
            { isCanvasTrue &&
                <>
                <MainHeading title={ 'Canvas LTI Setup' } />
                    <CardView>
                    <SubHeading title={ 'Canvas LTI – Configured' } />
                    { body }
                    </CardView>
                </>
            }
            { isBlackboardTrue &&
                <>
                <MainHeading title={ 'Blackboard LTI Setup' } />
                    <CardView>
                    <SubHeading title={ 'Blackboard LTI – Configured' } />
                    { body }
                    </CardView>
                </>
            }
            { isBrightspaceTrue &&
                <>
                    <MainHeading title={ 'BrightSpace LTI Setup' } />
                    <CardView>
                        <SubHeading title={ 'BrightSpace LTI – Configured' } />
                    { body }
                    </CardView>
                </>
            }
            { isMoodleLtiTrue &&
                <>
                    <MainHeading title={ 'Moodle LTI Setup' } />
                    <CardView>
                        <SubHeading title={ 'Moodle LTI – Configured' } />
                    { body }
                    </CardView>
                </>
            }
        </>
    );
};

IntegrationTypeDetail.propTypes = {
    integrationData: PropTypes.object,
    routerData: PropTypes.object
};

export default IntegrationTypeDetail;