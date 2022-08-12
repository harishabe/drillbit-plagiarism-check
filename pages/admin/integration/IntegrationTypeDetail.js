import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { Button, Divider } from '@mui/material';
import { ConfigIcon } from '../../../assets/icon';
import {
    CardView,
    SubHeading,
    SubTitle,
    SubTitle1
} from '../../../components';

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

const IntegrationTypeDetail = ({
    integrationData,
    routerData
}) => {

    const classes = useStyles();

    return (
        <CardView>
            <SubHeading title={routerData?.integration?.charAt(0).toUpperCase() + routerData?.integration?.slice(1) + ' ' + 'is configured'} />
            <Button className={classes.margin} variant="contained">
                <ConfigIcon /> <span className={classes.ml10}>Change Configuration</span>
            </Button>
            <Divider className={classes.mt10} />
            <div className={classes.margin}></div>
            <SubTitle title="Technical Contact" />
            <div className={classes.inlineDisplay}>
                <SubTitle1 title="Name" />
                <div className={classes.mr25}></div>: <div className={classes.ml25}>
                    <SubTitle title={integrationData?.name} /></div>
            </div>
            <div className={classes.inlineDisplay}>
                <SubTitle1 title="Email Address" />
                <div className={classes.mr25}></div>: <div className={classes.ml25}>
                    <SubTitle title={integrationData?.email} /></div>
            </div>
            <div className={classes.inlineDisplay}>
                <SubTitle1 title="Phone Number" />
                <div className={classes.mr25}></div>: <div className={classes.ml25}>
                    <SubTitle title={integrationData?.phone} /></div>
            </div>
            <Divider className={classes.mt10} />
            <div className={classes.margin}></div>
            <SubTitle title="Configuration Details :" />
            <div className={classes.inlineDisplay}>
                <SubTitle1 title="API Key" />
                <div className={classes.mr25}></div>: <div className={classes.ml25}>
                    <SubTitle title={integrationData?.api_key} /></div>
            </div>
            <div className={classes.inlineDisplay}>
                <SubTitle1 title="College Name" />
                <div className={classes.mr25}></div>: <div className={classes.ml25}>
                    <SubTitle title={integrationData?.college_name} /></div>
            </div>
            <div className={classes.inlineDisplay}>
                <SubTitle1 title="Configured Date" />
                <div className={classes.mr25}></div>: <div className={classes.ml25}>
                    <SubTitle title={integrationData?.created_date} /></div>
            </div>
            <div className={classes.inlineDisplay}>
                <SubTitle1 title="Moodle URL" />
                <div className={classes.mr25}></div>: <div className={classes.ml25}>
                    <SubTitle title={integrationData?.lms_url} /></div>
            </div>
        </CardView>
    )
};

IntegrationTypeDetail.propTypes = {
    integrationData: PropTypes.object,
    routerData: PropTypes.object
};

export default IntegrationTypeDetail;