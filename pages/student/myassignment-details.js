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
import { GetSubmissionData, GetQna, GetFeedback, SendData } from '../../redux/action/student/StudentAction';


import SubmissionHistory from './submission-history'
import QA from './q&a'
import Feedback from './feedback'
import { create } from 'lodash';

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
    SendData,
    submissionData,
    qnaData,
    feedbackData,
    feedbackPaperId,
    isLoadingSubmission,
    isLoadingQa,
    isLoadingFeedback,
    isLoadingAns
}) => {

    const router = useRouter();

    useEffect(() => {
        GetSubmissionData(router.query.clasId, router.query.assId);
        GetQna(router.query.clasId, router.query.assId);
        { submissionData && GetFeedback(router.query.clasId, router.query.assId, feedbackPaperId); }

    }, [router.query.clasId, router.query.assId, feedbackPaperId]);



    const handleSend = (e, ans1, ans2, ans3, ans4, ans5) => {
        // console.log('test', e, ans1, ans2, ans3, ans4, ans5);

        // const data = qnaData.map((item, index) => {
        //     return `a${index + 1} : ${item[index].answer === null ? ans1 : item[index].answer}`
        // })

        const data = {
            'a1': qnaData[0].answer === null ? ans1 : qnaData[0].answer,
            'a2': qnaData[1].answer === null ? ans2 : qnaData[1].answer,
            'a3': qnaData[2].answer === null ? ans3 : qnaData[2].answer,
            'a4': qnaData[3].answer === null ? ans4 : qnaData[3].answer,
            'a5': qnaData[4].answer === null ? ans5 : qnaData[4].answer
        }
        // console.log("firstfirstfirst", data, router.query.clasId, router.query.assId)
        SendData(data, router.query.clasId, router.query.assId);
        GetQna(router.query.clasId, router.query.assId);
    }

    const componentList = [
        <SubmissionHistory
            submissionData={ submissionData }
            isLoadingSubmission={ isLoadingSubmission }
        />,
        <QA
            GetQna={ GetQna }
            qnaData={ qnaData }
            isLoadingQa={ isLoadingQa }
            isLoadingAns={ isLoadingAns }
            handleSend={ handleSend }
        />,
        <Feedback
            feedbackData={ feedbackData }
            isLoadingFeedback={ isLoadingFeedback }
        />
    ];

    return (
        <React.Fragment>
            <BreadCrumb item={StudentBreadCrumb} />
            {/* <MainHeading title='My Assignments Details' /> */}
            <CardView>
                <Grid container spacing={1}>
                    {details.map((item, index) => (
                        <Grid item lg={ 2 } xs={ 12 }>
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
    feedbackData: state?.studentClasses?.feedbackData,
    qnaData: state?.studentClasses?.qnaData,
    isLoadingSubmission: state?.studentClasses?.isLoadingSubmission,
    isLoadingQa: state?.studentClasses?.isLoadingQa,
    isLoadingFeedback: state?.studentClasses?.isLoadingFeedback,
    isLoadingAns: state?.studentClasses?.isLoadingAns,
    feedbackPaperId: state?.studentClasses?.submissionData?._embedded?.submissionsList?.[0]?.paper_id,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetSubmissionData: (class_id, folder_id) => dispatch(GetSubmissionData(class_id, folder_id)),
        GetQna: (class_id, folder_id) => dispatch(GetQna(class_id, folder_id)),
        GetFeedback: (class_id, folder_id, paper_id) => dispatch(GetFeedback(class_id, folder_id, paper_id)),
        SendData: (data, class_id, folder_id) => dispatch(SendData(data, class_id, folder_id)),
    };
};

MyAssignmentDetails.layout = Student

export default connect(mapStateToProps, mapDispatchToProps)(MyAssignmentDetails);
