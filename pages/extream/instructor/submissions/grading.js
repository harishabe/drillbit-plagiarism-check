import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Tooltip, Skeleton, Pagination } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import { DownloadWarningIcon } from "../../../../assets/icon";
import Instructor from '../../../../layouts/Instructor';
import { CommonTable, SimilarityStatus, CreateDrawer, WarningDialog } from '../../../../components';
import { connect } from 'react-redux';
import { GetGradingList } from '../../../../redux/action/instructor/InstructorAction';
import { useRouter } from 'next/router';
import FeedbackForm from '../form/FeedbackForm';
import { BASE_URL_EXTREM } from '../../../../utils/BaseUrl';
import { DOWNLOAD_CSV, BACKEND_NO_DATA_PLACEHOLDER, WARNING_MESSAGES } from '../../../../constant/data/Constant';
import {
    DownloadCsv,
} from '../../../../redux/action/common/Submission/SubmissionAction';
import { PaginationValue } from '../../../../utils/PaginationUrl';
import { PaginationContainer, StyledButtonIcon } from '../../../../style/index';

const DownloadButton = styled.div`
    margin-top:-5px;
`;

const useStyles = makeStyles(() => ({
    button: {
        margin: "10px 6px 0px 0px",
    }
}));

const Grading = ({
    GetGradingList,
    DownloadCsv,
    gradingData,
    isLoading,
    isLoadingDownload,
    pageDetails
}) => {
    const theme = useTheme();
    const classes = useStyles();
    const router = useRouter();
    const clasId = router.query.clasId;
    const assId = router.query.assId;

    const [rows, setRows] = useState([]);
    const [feedbackData, setFeedbackData] = useState('');
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: PaginationValue?.field,
        orderBy: PaginationValue?.orderBy,
    });

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("900"));

    const DownloadField = styled.div`
        position:absolute;
        top: ${isSmallScreen ? "85px" : "120px"};
        right:25px;
    `;

    useEffect(() => {
        let url = `classes/${clasId}/assignments/${assId}/grading`;
        GetGradingList(url, paginationPayload);
    }, [clasId, assId, paginationPayload]);

    const columns = [
        { id: 'STname', label: 'Student Name', maxWidth: 216 },
        { id: 'gradingpaper_id', label: 'Paper ID', maxWidth: 216 },
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
                    {
                        'component': <StyledButtonIcon variant="outlined" size='small' disabled={ grading.paper_id === '--' } ><FeedbackOutlinedIcon fontSize='small' /></StyledButtonIcon>, 'type': 'feedback', 'title': grading.paper_id === '--' ? 'Feedback is disabled because of no similarity percentage.' : 'Feedback'
                    },
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

    const closeDrawerOnSuccess = (drawerClose) => {
        setShowFeedbackForm(drawerClose);
    };

    const handleDownload = () => {
        setShowModal(true)
    };

    const handleDownloadYesWarning = () => {
        DownloadCsv(BASE_URL_EXTREM + `/extreme/classes/${clasId}/assignments/${assId}/grading/download`, DOWNLOAD_CSV.GRADING_LISTS);
        setShowModal(false);
    };

    const handleDownloadCloseWarning = () => {
        setShowModal(false);
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
                        handleCloseDrawer={ closeDrawerOnSuccess }
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
                        <Skeleton width={ 30 } height={ 50 } />
                        :
                        <Tooltip title="Download csv" arrow>
                            <StyledButtonIcon
                                className={ classes.button }
                                onClick={ handleDownload }
                                variant="outlined"
                                size="small"
                            >
                                <FileDownloadOutlinedIcon fontSize="medium" />
                            </StyledButtonIcon>
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

            { showModal && (
                <WarningDialog
                    warningIcon={ <DownloadWarningIcon /> }
                    message={ WARNING_MESSAGES.DOWNLOAD }
                    handleYes={ handleDownloadYesWarning }
                    handleNo={ handleDownloadCloseWarning }
                    isOpen={ true }
                />
            ) }

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