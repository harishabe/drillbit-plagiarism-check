import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Student from '../../layouts/Student'
import {
    BreadCrumb,
    CardView,
    SubTitle1,
    SubTitle,
    TabMenu,
    StatusDot,
} from '../../components'
import { DownloadFileIcon } from '../../assets/icon'
import { GetSubmissionData, GetQna, GetFeedback } from '../../redux/action/student/StudentAction';


import SubmissionHistory from './submission-history'
import QA from './q&a'
import Feedback from './feedback'

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
        link: '/student/myassignments',
        active: false,
    },
    {
        name: 'My assignments details',
        link: '',
        active: true,
    },
]

const details = [
    {
        label: 'Subject',
        name: 'Java',
    },
    {
        label: 'Assignment Name',
        name: 'Java1',
    },
    {
        label: 'Instructor Name',
        name: 'Akshay',
    },
    {
        label: 'Status',
        name: <StatusDot color='#38BE62' title='Active' />,
    },
    {
        label: 'Create Date',
        name: '01/01/2022',
    },
    {
        label: 'End Date',
        name: '02/02/2022',
    },
    {
        label: <DownloadFileIcon />,
    },
]

const tabMenu = [
    {
        label: 'Submission History',
    },
    {
        label: 'Q&A',
    },
    {
        label: 'Feedback',
    },
]

const MyAssignmentDetails = ({
    GetSubmissionData,
    GetQna,
    GetFeedback,
    c,
    qnaData,
    feedbackData,
    feedbackPaperId,
    isLoadingSubmission,
    isLoadingQa,
}) => {

    const router = useRouter();

    // const paperId = submissionData?.map((item) => {
    //     return item?.[0]?.paper_id;
    // })
    // console.log("paperId", paperId)

    useEffect(() => {
        GetSubmissionData(router.query.clasId, router.query.assId);
    }, [router.query.clasId, router.query.assId]);

    useEffect(() => {
        GetQna(router.query.clasId, router.query.assId);
    }, [router.query.clasId, router.query.assId]);

    useEffect(() => {
        GetFeedback(router.query.clasId, router.query.assId, feedbackPaperId);
    }, [router.query.clasId, router.query.assId, feedbackPaperId]);

    const componentList = [
        <SubmissionHistory
            submissionData={ submissionData }
            isLoadingSubmission={ isLoadingSubmission }
        />,
        <QA
            qnaData={ qnaData }
            isLoadingQa={ isLoadingQa }
        />,
        <Feedback feedbackData={ feedbackData } />
    ];

    return (
        <React.Fragment>
            <BreadCrumb item={StudentBreadCrumb} />
            {/* <MainHeading title='My Assignments Details' /> */}
            <CardView>
                <Grid container spacing={1}>
                    {details.map((item, index) => (
                        <Grid item md={2} xs={12}>
                            <SubTitle title={item.label} />
                            <SubTitle1 title={item.name} />
                            <Divider orientation='vertical' flexItem />
                        </Grid>
                    ))}
                </Grid>
            </CardView>
            <TabMenu menuButton={tabMenu} components={componentList} />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    submissionData: state?.studentClasses?.submissionData?._embedded?.submissionsList,
    feedbackPaperId: state?.studentClasses?.submissionData?._embedded?.submissionsList?.[0]?.paper_id,
    feedbackData: state?.studentClasses?.feedbackData,
    qnaData: state?.studentClasses?.qnaData,
    isLoadingSubmission: state?.studentClasses?.isLoadingSubmission,
    isLoadingQa: state?.studentClasses?.isLoadingQa,
    isLoadingFeedback: state?.studentClasses?.isLoadingFeedback,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetSubmissionData: (class_id, folder_id) => dispatch(GetSubmissionData(class_id, folder_id)),
        GetQna: (class_id, folder_id) => dispatch(GetQna(class_id, folder_id)),
        GetFeedback: (class_id, folder_id, paper_id) => dispatch(GetFeedback(class_id, folder_id, paper_id)),
    };
};

MyAssignmentDetails.layout = Student

export default connect(mapStateToProps, mapDispatchToProps)(MyAssignmentDetails);
