import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from "next/router";
import { makeStyles } from '@mui/styles';
import { Button, Divider } from '@mui/material';
import { ConfigIcon } from '../../../assets/icon';
import {
    CardView,
    SubHeading,
    MainHeading,
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
    isMoodleTrue,
    isCanvasTrue,
    isBlackboardTrue,
    integrationData,
    routerData,
    handleConfig
}) => {

    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            { isMoodleTrue &&
                <>
                    <MainHeading title={ routerData?.integration?.charAt(0).toUpperCase() + router?.query?.integration?.slice(1) + ' ' + 'Plugin Setup' } />
                    <CardView>
                    <SubHeading title={ routerData?.integration?.charAt(0).toUpperCase() + routerData?.integration?.slice(1) + ' ' + 'Plug-in – Configured ' } />
                    <Button onClick={ handleConfig } className={ classes.margin } variant="contained">
                        <ConfigIcon /> <span className={ classes.ml10 }>Change Configuration</span>
                    </Button>

                    <Divider className={ classes.mt10 } />
                    <div className={ classes.margin }></div>
                    <SubTitle title="Configuration Details :" />
                    <div className={ classes.inlineDisplay }>
                        <SubTitle1 title="API Key" />
                        <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                            <SubTitle title={ integrationData?.api_key } /></div>
                    </div>
                    <div className={ classes.inlineDisplay }>
                        <SubTitle1 title="College Name" />
                        <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                            <SubTitle title={ integrationData?.college_name } /></div>
                    </div>
                    <div className={ classes.inlineDisplay }>
                        <SubTitle1 title="Configured Date" />
                        <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                            <SubTitle title={ integrationData?.created_date } /></div>
                    </div>
                    <div className={ classes.inlineDisplay }>
                        <SubTitle1 title="Moodle URL" />
                        <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                            <SubTitle title={ integrationData?.lms_url } /></div>
                    </div>

                    <Divider className={ classes.mt10 } />
                    <div className={ classes.margin }></div>
                    <SubTitle title="Technical Contact Details :" />
                    <div className={ classes.inlineDisplay }>
                        <SubTitle1 title="Name" />
                        <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                            <SubTitle title={ integrationData?.name } /></div>
                    </div>
                    <div className={ classes.inlineDisplay }>
                        <SubTitle1 title="Email Address" />
                        <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                            <SubTitle title={ integrationData?.email } /></div>
                    </div>
                    <div className={ classes.inlineDisplay }>
                        <SubTitle1 title="Phone Number" />
                        <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                            <SubTitle title={ integrationData?.phone } /></div>
                    </div>
                    </CardView>
                </>
            }
            { isCanvasTrue &&
                <>
                <MainHeading title={ 'Canvas LTI Setup' } />
                    <CardView>
                    <SubHeading title={ 'Canvas LTI – Configured' } />
                        <Button onClick={ handleConfig } className={ classes.margin } variant="contained">
                            <ConfigIcon /> <span className={ classes.ml10 }>Change Configuration</span>
                        </Button>
                        <Divider className={ classes.mt10 } />
                        <div className={ classes.margin }></div>
                        <SubTitle title="Configuration Details :" />
                    <div className={ classes.inlineDisplay }>
                        <SubTitle1 title="Access end point" />
                        <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                            <SubTitle title={ integrationData?.access_end_point } /></div>
                    </div>
                    <div className={ classes.inlineDisplay }>
                        <SubTitle1 title="Authentication end point" />
                        <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                            <SubTitle title={ integrationData?.auth_end_point } /></div>
                    </div>
                    <div className={ classes.inlineDisplay }>
                        <SubTitle1 title="Configured Date" />
                        <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                            <SubTitle title={ integrationData?.creation_time } /></div>
                    </div>
                    <div className={ classes.inlineDisplay }>
                        <SubTitle1 title="Client id" />
                        <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                            <SubTitle title={ integrationData?.client_id } /></div>
                    </div>
                    <div className={ classes.inlineDisplay }>
                        <SubTitle1 title="College Name" />
                            <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                                <SubTitle title={ integrationData?.college_name } /></div>
                        </div>
                        <div className={ classes.inlineDisplay }>
                            <SubTitle1 title="Keyset end point" />
                            <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                                <SubTitle title={ integrationData?.keyset_end_point } /></div>
                        </div>
                        <div className={ classes.inlineDisplay }>
                            <SubTitle1 title="Email Address" />
                            <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                                <SubTitle title={ integrationData?.mail_id } /></div>
                        </div>
                        <div className={ classes.inlineDisplay }>
                            <SubTitle1 title="Method" />
                            <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                                <SubTitle title={ integrationData?.method } /></div>
                        </div>
                        <div className={ classes.inlineDisplay }>
                            <SubTitle1 title="Platform url" />
                            <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                                <SubTitle title={ integrationData?.platform_url } /></div>
                        </div>
                    </CardView>
                </>
            }
            { isBlackboardTrue &&
                <>
                <MainHeading title={ 'Blackboard LTI Setup' } />
                    <CardView>
                    <SubHeading title={ 'Blackboard LTI – Configured' } />
                        <Button onClick={ handleConfig } className={ classes.margin } variant="contained">
                            <ConfigIcon /> <span className={ classes.ml10 }>Change Configuration</span>
                        </Button>
                        <Divider className={ classes.mt10 } />
                        <div className={ classes.margin }></div>
                        <SubTitle title="Configuration Details :" />
                        <div className={ classes.inlineDisplay }>
                            <SubTitle1 title="Access end point" />
                            <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                                <SubTitle title={ integrationData?.access_end_point } /></div>
                        </div>
                        <div className={ classes.inlineDisplay }>
                            <SubTitle1 title="Authentication end point" />
                            <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                                <SubTitle title={ integrationData?.auth_end_point } /></div>
                        </div>
                    <div className={ classes.inlineDisplay }>
                        <SubTitle1 title="Configured Date" />
                        <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                            <SubTitle title={ integrationData?.creation_time } /></div>
                    </div>
                    <div className={ classes.inlineDisplay }>
                        <SubTitle1 title="Client id" />
                        <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                            <SubTitle title={ integrationData?.client_id } /></div>
                    </div>
                    <div className={ classes.inlineDisplay }>
                        <SubTitle1 title="College Name" />
                        <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                            <SubTitle title={ integrationData?.college_name } /></div>
                    </div>
                    <div className={ classes.inlineDisplay }>
                        <SubTitle1 title="Keyset end point" />
                        <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                            <SubTitle title={ integrationData?.keyset_end_point } /></div>
                    </div>
                    <div className={ classes.inlineDisplay }>
                        <SubTitle1 title="Email Address" />
                        <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                            <SubTitle title={ integrationData?.mail_id } /></div>
                    </div>
                    <div className={ classes.inlineDisplay }>
                        <SubTitle1 title="Method" />
                        <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                            <SubTitle title={ integrationData?.method } /></div>
                    </div>
                    <div className={ classes.inlineDisplay }>
                        <SubTitle1 title="Platform url" />
                        <div className={ classes.mr25 }></div>: <div className={ classes.ml25 }>
                            <SubTitle title={ integrationData?.platform_url } /></div>
                    </div>
                </CardView>
                </>
            }
        </>
    )
};

IntegrationTypeDetail.propTypes = {
    integrationData: PropTypes.object,
    routerData: PropTypes.object
};

export default IntegrationTypeDetail;