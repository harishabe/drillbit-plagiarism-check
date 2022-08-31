import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Skeleton } from '@mui/material';
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton';
import { Grid, Tooltip } from '@mui/material'
import Student from '../../layouts/Student'
import {
    BreadCrumb,
    CardView,
    SubTitle1,
    SubTitle,
    TabMenu,
    StatusDot,
    WidgetCard,
    EllipsisText,
} from '../../components'
import { DownloadIcon, NoOfClassIcon, NoOfAssignmntIcon } from '../../assets/icon'
import {
    GetSubmissionData,
    GetQna,
    GetFeedback,
    SendData,
    GetSubmissionHeaderData,
    DownloadStudentCsv,
    DownloadOriginalFile
} from '../../redux/action/student/StudentAction';
import { PaginationValue } from '../../utils/PaginationUrl';

import SubmissionHistory from './submission-history'
import QA from './q&a'
import Feedback from './feedback'
import { formatDate } from '../../utils/RegExp';

const tabMenu = [
    {
        label: 'Submission',
    },
    {
        label: 'Q&A',
    }
]

const MyAssignmentDetails = ({
    GetSubmissionData,
    GetSubmissionHeaderData,
    DownloadStudentCsv,
    GetQna,
    GetFeedback,
    SendData,
    submissionData,
    headerData,
    qnaData,
    feedbackData,
    pageDetails,
    isLoadingSubmission,
    isLoadingHeader,
    isLoadingDownload,
    isLoadingQa,
    isLoadingFeedback,
    isLoadingAns,
    DownloadOriginalFile
}) => {

    const router = useRouter();

    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'paper_id',
        orderBy: PaginationValue?.orderBy,
    });

    const StudentBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/student/dashboard',
            active: false,
        },
        {
            name: 'My classes',
            link: '/student/myclasses',
            active: false,
        },
        {
            name: 'My assignments',
            link: '/student/myassignments?' + router?.asPath?.slice(router?.pathname?.length).split('&')[1],
            active: false,
        },
        {
            name: 'Submission details',
            link: '',
            active: true,
        },
    ]


    const details = [
        {
            label: 'Class Name',
            name: <EllipsisText value={headerData?.subject} charLength={18} />,
        },
        {
            label: 'Assignment Name',
            name: <EllipsisText value={headerData?.assignmentName} charLength={18} />,
        },
        {
            label: 'Instructor Name',
            name: <EllipsisText value={headerData?.instructorName} charLength={18} />,
        },
        {
            label: 'Status',
            name: <StatusDot color={headerData?.status === 'active' ? '#38BE62' : '#E9596F'} title={headerData?.status} />,
        },
        {
            label: 'Create Date',
            name: formatDate(headerData?.createdDate),
        },
        {
            label: 'End Date',
            name: formatDate(headerData?.endDate),
        },
    ]

    useEffect(() => {
        GetSubmissionData(router.query.clasId, router.query.assId, paginationPayload);
    }, [router.query.clasId, router.query.assId, paginationPayload]);

    useEffect(() => {
        GetSubmissionHeaderData(router.query.clasId, router.query.assId);
    }, [router.query.clasId, router.query.assId]);

    const handleDownload = () => {
        let url = `/${router.query.clasId}/assignments/${router.query.assId}/downloadHistory`;
        DownloadStudentCsv(url)
    }

    const handleSend = (e, ans1, ans2, ans3, ans4, ans5) => {
        const data = {
            'a1': qnaData[0].answer === null ? ans1 : qnaData[0].answer,
            'a2': qnaData[1].answer === null ? ans2 : qnaData[1].answer,
            'a3': qnaData[2].answer === null ? ans3 : qnaData[2].answer,
            'a4': qnaData[3].answer === null ? ans4 : qnaData[3].answer,
            'a5': qnaData[4].answer === null ? ans5 : qnaData[4].answer
        }
        SendData(data, router.query.clasId, router.query.assId);
        GetQna(router.query.clasId, router.query.assId);
    }

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    const componentList = [
        <SubmissionHistory
            submissionData={submissionData}
            isLoadingSubmission={isLoadingSubmission}
            pageDetails={pageDetails}
            handleChange={handleChange}
        />,
        <QA
            GetQna={GetQna}
            qnaData={qnaData}
            isLoadingQa={isLoadingQa}
            isLoadingAns={isLoadingAns}
            handleSend={handleSend}
        />,
        // <Feedback
        //     GetFeedback={GetFeedback}
        //     feedbackData={feedbackData}
        //     isLoadingFeedback={isLoadingFeedback}
        // />
    ];

    return (
        <React.Fragment>
            <Grid container>
                <Grid item md={10} xs={12}>
                    <BreadCrumb item={StudentBreadCrumb} />
                </Grid>
                <Grid item md={1} xs={6} sx={{marginTop:'15px'}}>
                    <div>
                        <StatusDot color={headerData?.status === 'active' ? '#38BE62' : '#E9596F'} title={headerData?.status} />
                    </div>  
                </Grid>
                <Grid item md={1} xs={6}>
                    <Grid container>
                        <Tooltip arrow title="Download csv">
                            <IconButton
                                sx={{ ml: 2, p: 1 }}
                                color="primary"
                                aria-label="download-file"
                                size="large"
                                onClick={handleDownload}>
                                {isLoadingDownload ? <Skeleton width={50} /> : <DownloadIcon />}
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={3} xs={12}>
                        <WidgetCard
                            title='Class name'
                            count={ isLoadingHeader ? <Skeleton /> : <EllipsisText value={ headerData?.subject } charLength={ 18 } /> }
                        />
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <WidgetCard
                            title='Assignment name'
                            count={ isLoadingHeader ? <Skeleton /> : <EllipsisText value={ headerData?.assignmentName } charLength={ 18 } /> }
                        />
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <WidgetCard
                            title='Instructor name'
                            count={ isLoadingHeader ? <Skeleton /> : <EllipsisText value={ headerData?.instructorName } charLength={ 18 } /> }
                        />
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <WidgetCard
                            title='Date'
                            count={ isLoadingHeader ? <Skeleton /> : <EllipsisText value={ formatDate(headerData?.createdDate) + '-' + formatDate(headerData?.endDate) } charLength={ 25 } /> }
                        />
                    </Grid>
                </Grid>
            </Box>

            <div style={{ margin: '15px 0px' }}></div>
            <CardView>
                <TabMenu menuButton={tabMenu} components={componentList} />
            </CardView>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    submissionData: state?.studentClasses?.submissionData?._embedded?.submissionsResponseList,
    headerData: state?.studentClasses?.headerData,
    feedbackData: state?.studentClasses?.feedbackData,
    qnaData: state?.studentClasses?.qnaData,
    pageDetails: state?.studentClasses?.submissionData?.page,
    isLoadingSubmission: state?.studentClasses?.isLoadingSubmission,
    isLoadingHeader: state?.studentClasses?.isLoadingHeader,
    isLoadingDownload: state?.studentClasses?.isLoadingDownload,
    isLoadingQa: state?.studentClasses?.isLoadingQa,
    isLoadingFeedback: state?.studentClasses?.isLoadingFeedback,
    isLoadingAns: state?.studentClasses?.isLoadingAns,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetSubmissionData: (class_id, folder_id, PaginationValue) => dispatch(GetSubmissionData(class_id, folder_id, PaginationValue)),
        DownloadOriginalFile: (class_id, folder_id, paper_id) => dispatch(DownloadOriginalFile(class_id, folder_id, paper_id)),
        GetSubmissionHeaderData: (class_id, folder_id) => dispatch(GetSubmissionHeaderData(class_id, folder_id)),
        DownloadStudentCsv: (url) => dispatch(DownloadStudentCsv(url)),
        GetQna: (class_id, folder_id) => dispatch(GetQna(class_id, folder_id)),
        GetFeedback: (class_id, folder_id) => dispatch(GetFeedback(class_id, folder_id)),
        SendData: (data, class_id, folder_id) => dispatch(SendData(data, class_id, folder_id)),
    };
};

MyAssignmentDetails.layout = Student

export default connect(mapStateToProps, mapDispatchToProps)(MyAssignmentDetails);
