import React, { useEffect } from 'react';
import { Skeleton } from '@mui/material';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton';
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
import {
    GetSubmissionData,
    GetQna,
    GetFeedback,
    SendData,
    GetSubmissionHeaderData,
    DownloadStudentCsv
} from '../../redux/action/student/StudentAction';


import SubmissionHistory from './submission-history'
import QA from './q&a'
import Feedback from './feedback'
import { formatDate } from '../../utils/RegExp';

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

const DownloadButton = styled.div`
    position:static;
    top:30px;
    right:30px;
`;

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
    feedbackPaperId,
    isLoadingSubmission,
    isLoadingHeader,
    isLoadingQa,
    isLoadingFeedback,
    isLoadingAns
}) => {

    const router = useRouter();

    const details = [
        {
            label: 'Subject',
            name: headerData?.subject,
        },
        {
            label: 'Assignment Name',
            name: headerData?.assignmentName,
        },
        {
            label: 'Instructor Name',
            name: headerData?.instructorName,
        },
        {
            label: 'Status',
            name: <StatusDot color={ headerData?.status === 'active' ? '#38BE62' : '#E9596F' } title={ headerData?.status } />,
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
        GetSubmissionData(router.query.clasId, router.query.assId);
        GetSubmissionHeaderData(router.query.clasId, router.query.assId);
        // GetQna(router.query.clasId, router.query.assId);
        { submissionData && GetFeedback(router.query.clasId, router.query.assId, feedbackPaperId); }

    }, [router.query.clasId, router.query.assId, feedbackPaperId]);

    const handleDownload = () => {
        let url = `/${router.query.clasId}/assignments/${router.query.assId}/downloadHistory`;
        DownloadStudentCsv(url)
    }

    const handleSend = (e, ans1, ans2, ans3, ans4, ans5) => {
        /*
        // To simply the data code
        // const data = qnaData.map((item, index) => {
        //     return `a${index + 1} : ${item[index].answer === null ? ans1 : item[index].answer}`
        // })
        */
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
            <BreadCrumb item={ StudentBreadCrumb } />
            <CardView>
                <Grid container spacing={ 0 }>
                    {details.map((item, index) => (
                        <>
                            <Grid md={ 1.7 } xs={ 12 } sx={ { ml: 3 } }>
                                <SubTitle title={ item.label } />
                                { isLoadingHeader ? <Skeleton /> :
                                    <SubTitle1 title={ item.name } />
                                }
                            </Grid> 
                            <Divider orientation="vertical" flexItem>
                            </Divider>
                        </>
                    ))}
                    <DownloadButton>
                        <IconButton color="primary" aria-label="download-file" onClick={ handleDownload }>
                            <DownloadFileIcon />
                        </IconButton>
                    </DownloadButton>
                </Grid>
            </CardView>
            <TabMenu menuButton={tabMenu} components={componentList} />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    submissionData: state?.studentClasses?.submissionData?._embedded?.submissionsList,
    headerData: state?.studentClasses?.headerData,
    feedbackData: state?.studentClasses?.feedbackData,
    qnaData: state?.studentClasses?.qnaData,
    isLoadingSubmission: state?.studentClasses?.isLoadingSubmission,
    isLoadingHeader: state?.studentClasses?.isLoadingHeader,
    isLoadingQa: state?.studentClasses?.isLoadingQa,
    isLoadingFeedback: state?.studentClasses?.isLoadingFeedback,
    isLoadingAns: state?.studentClasses?.isLoadingAns,
    feedbackPaperId: state?.studentClasses?.submissionData?._embedded?.submissionsList?.[0]?.paper_id,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetSubmissionData: (class_id, folder_id) => dispatch(GetSubmissionData(class_id, folder_id)),
        GetSubmissionHeaderData: (class_id, folder_id) => dispatch(GetSubmissionHeaderData(class_id, folder_id)),
        DownloadStudentCsv: (url) => dispatch(DownloadStudentCsv(url)),
        GetQna: (class_id, folder_id) => dispatch(GetQna(class_id, folder_id)),
        GetFeedback: (class_id, folder_id, paper_id) => dispatch(GetFeedback(class_id, folder_id, paper_id)),
        SendData: (data, class_id, folder_id) => dispatch(SendData(data, class_id, folder_id)),
    };
};

MyAssignmentDetails.layout = Student

export default connect(mapStateToProps, mapDispatchToProps)(MyAssignmentDetails);
