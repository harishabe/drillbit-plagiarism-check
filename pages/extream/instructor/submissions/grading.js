import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Tooltip, IconButton, Skeleton, Pagination } from '@mui/material';
import Instructor from '../../../../layouts/Instructor';
import { CommonTable, SimilarityStatus, CreateDrawer } from '../../../../components';
import { MessageExclamatoryIcon, DownloadIcon } from '../../../../assets/icon';
import { connect } from 'react-redux';
import { GetGradingList } from '../../../../redux/action/instructor/InstructorAction';
import { useRouter } from 'next/router';
import FeedbackForm from '../form/FeedbackForm';
import { BASE_URL_EXTREM } from '../../../../utils/BaseUrl';
import { DOWNLOAD_CSV, BACKEND_NO_DATA_PLACEHOLDER } from '../../../../constant/data/Constant';
import {
    DownloadCsv,
} from '../../../../redux/action/common/Submission/SubmissionAction';
import { PaginationValue } from '../../../../utils/PaginationUrl';
import { PaginationContainer } from '../../../../style/index';

const SkeletonContainer = styled.div`
    margin-top: 16px;
    margin-right: 5px;
`;

const DownloadField = styled.div`
    position:absolute;
    top: 125px;
    right:25px;
`;

const DownloadButton = styled.div`
    margin-top:-5px;
`;

const Grading = ({
    GetGradingList,
    DownloadCsv,
    gradingData,
    isLoading,
    isLoadingDownload,
    pageDetails
}) => {

    const router = useRouter();

    const clasId = router.query.clasId;

    const assId = router.query.assId;

    const [rows, setRows] = useState([]);
    const [feedbackData, setFeedbackData] = useState('');
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);

    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: PaginationValue?.field,
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        let url = `classes/${clasId}/assignments/${assId}/grading`;
        GetGradingList(url, paginationPayload);
    }, [clasId, assId, paginationPayload]);

    const columns = [
        { id: 'STname', label: 'Student Name', maxWidth: 216 },
        { id: 'paper_id', label: 'Paper ID', maxWidth: 216 },
        { id: 'similarity', label: 'Similarity', maxWidth: 216 },
        { id: 'marks', label: 'Assignment Marks', maxWidth: 216 },
        { id: 'action', label: 'Feedback', maxWidth: 216 },
    ];

    function createData(STname, paper_id, marks, similarity, action, flag) {
        return {
            STname, paper_id, marks, similarity, action, flag
        };
    }

    useEffect(() => {
        let row = '';
        let arr = [];
        gradingData?.map((grading) => {
            row = createData(
                grading.stduentName,
                grading.paper_id,
                grading.obtained_marks === BACKEND_NO_DATA_PLACEHOLDER ? grading.obtained_marks : grading.obtained_marks + '/' + grading.max_marks,
                <SimilarityStatus percent={ grading.similarity } flag={ grading.flag } />,
                [
                    { 'component': <MessageExclamatoryIcon />, 'type': 'feedback', 'title': 'Feedback' },
                ]
            );
            row['isSelected'] = false;
            arr.push(row);
        });
        setRows([...arr]);
    }, [gradingData]);

    const handleAction = (event, icon, rowData) => {
        if (rowData?.paper_id === '--') {
            setShowFeedbackForm(false);
        } else {
            setShowFeedbackForm(true);
            setFeedbackData(rowData?.paper_id);
        }

    };

    const handleCloseDrawer = (drawerClose) => {
        setShowFeedbackForm(drawerClose);
    };

    const handleDownload = () => {
        DownloadCsv(BASE_URL_EXTREM + `/extreme/classes/${clasId}/assignments/${assId}/grading/download`, DOWNLOAD_CSV.GRADING_LISTS);
    };

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    return (
        <React.Fragment>
            {
                showFeedbackForm &&
                <CreateDrawer
                    title=""
                    isShowAddIcon={false}
                    showDrawer={showFeedbackForm}
                    handleDrawerClose={handleCloseDrawer}
                >
                    <FeedbackForm
                        clasId={clasId}
                        assId={assId}
                        feedbackData={feedbackData}
                        gradingData={gradingData}
                    />
                </CreateDrawer>
            }
            <DownloadField>
                <DownloadButton>
                    {gradingData?.length > 0 &&
                        isLoadingDownload ?
                        <SkeletonContainer>
                            <Skeleton width={40} />
                        </SkeletonContainer>
                        :
                        <Tooltip title="Download csv" arrow>
                            <IconButton
                                aria-label="download-file"
                                size="large"
                                onClick={handleDownload}>
                                <DownloadIcon />
                            </IconButton>
                        </Tooltip>
                    }
                </DownloadButton>
            </DownloadField>
            <CommonTable
                isCheckbox={false}
                isSorting={true}
                tableHeader={columns}
                tableData={rows}
                isLoading={isLoading}
                handleAction={handleAction}
            />

            <PaginationContainer>
                <Pagination
                    count={ pageDetails?.totalPages }
                    page={ pageDetails?.number + 1 }
                    onChange={ handleChange }
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </PaginationContainer>

        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    isLoading: state?.instructorMyFolders?.isLoadingSubmission,
    isLoadingDownload: state?.submission?.isLoadingDownload,
    gradingData: state?.instructorMyFolders?.submissionData?._embedded?.gradingDTOList,
    pageDetails: state?.instructorMyFolders?.submissionData?.page
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetGradingList: (url, PaginationValue) => dispatch(GetGradingList(url, PaginationValue)),
        DownloadCsv: (url, title) => dispatch(DownloadCsv(url, title)),
    };
};

Grading.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(Grading);