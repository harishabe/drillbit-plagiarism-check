import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Pagination } from '@mui/material';
import { useRouter } from 'next/router';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import {
    CommonTable,
    CreateDrawer,
    EllipsisText,
    SimilarityStatus
} from '../../../components';
import { MessageExclamatoryIcon, AddMultipleIcon, AddFromListIcon } from '../../../assets/icon';
import SubmissionForm from './form/SubmissionForm';
import { BASE_URL_ANALYSIS } from '../../../utils/BaseUrl';
import { PaginationContainer } from '../../style/index';

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
`;

const DownloadField = styled.div`
    position:absolute;
    top: 260px;
    right:20px;
`;

const DownloadButton = styled.div`
    margin-top:-5px;
`;

function createData(name, paper_id, date_up, grammar, percent, score, status, action, d_key) {
    return { name, paper_id, date_up, grammar, percent, score, status, action, d_key };
}

const SubmissionHistory = ({
    submissionData,
    isLoadingSubmission,
    pageDetails,
    handleChange,
    handleOriginalFileDownload,
    handleTableSort,
    handleAction,
    handleRefresh
}) => {
    const router = useRouter();
    const [rows, setRows] = useState([]);

    const columns = [
        { id: 'name', label: 'Filename', isDownload: true, minWidth: 140 },
        { id: 'paper_id', label: 'Paper ID', minWidth: 140 },
        { id: 'date_up', label: 'Date', minWidth: 140 },
        { id: 'grammar', label: 'Grammar', minWidth: 80 },
        { id: 'percent', label: 'Similarity', minWidth: 80 },
        { id: 'score', label: 'Marks', minWidth: 80 },
        { id: 'status', label: 'Status', minWidth: 100 },
        { id: 'action', label: 'Feedback', minWidth: 80 },
    ];

    useEffect(() => {
        let row = '';
        let arr = [];
        submissionData?.map((submission) => {
            row =
                createData(
                    <EllipsisText value={submission.original_fn} charLength={12} />,
                    submission.paper_id,
                    submission.date_up,                    
                    submission.grammar,
                    <SimilarityStatus percent={submission.percent} width={100} />,
                    submission.feedback?.marks,
                    submission.status,
                    [
                        { 'component': <MessageExclamatoryIcon />, 'type': 'feedback', 'title': 'Feedback' },
                    ],
                    submission.d_key
                );
            arr.push(row);
        });
        setRows([...arr]);
    }, [submissionData]);

    const handleShowAnalysisPage = (e, row) => {
        let token = localStorage.getItem('token');
        let url = BASE_URL_ANALYSIS + row.paper_id + '/' + row.d_key + '/' + token;
        window.open(url, '_blank', 'location=yes,scrollbars=yes,status=yes');
    };

    const handleShow = (e, info) => {
        if (info?.title === 'English') {
            router.push({ pathname: '/extream/student/uploadFile/englishFile', query: router.query });
        } else if (info?.title === 'Non English') {
            router.push({ pathname: '/extream/student/uploadFile/nonEnglishFile', query: router.query });
        }
    };

    return (
        <>
            <DownloadField>
                <DownloadButton>
                    <Tooltip title="Refresh" arrow>
                        <IconButton
                            aria-label="download-file"
                            size="large"
                            onClick={handleRefresh}
                        >
                            <RefreshOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </DownloadButton>
            </DownloadField>
            <CommonTable
                isCheckbox={false}
                isSorting={true}
                tableHeader={columns}
                tableData={rows}
                downloadSubmissionFile={handleOriginalFileDownload}
                handleTableSort={handleTableSort}
                isLoading={isLoadingSubmission}
                handleAction={handleAction}
                showAnalysisPage={handleShowAnalysisPage}
            />

            {!isLoadingSubmission &&
                <PaginationContainer>
                    <Pagination
                        count={pageDetails?.totalPages}
                        onChange={handleChange}
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                    />
                </PaginationContainer>
            }

            {/* <AddButtonBottom>
                <CreateDrawer
                    title="New Submission"
                    isShowAddIcon={true}
                >
                    <SubmissionForm />
                </CreateDrawer>
            </AddButtonBottom> */}

            <AddButtonBottom>
                <CreateDrawer
                    options={ [
                        {
                            icon: <AddMultipleIcon />,
                            title: 'Non English',
                            handleFromCreateDrawer: true
                        },
                        {
                            icon: <AddFromListIcon />,
                            title: 'English',
                            handleFromCreateDrawer: true
                        }] }
                    handleMultiData={ handleShow }
                    isShowAddIcon={ true }
                    title="Upload File"
                    navigateToMultiFile={ true }
                >
                </CreateDrawer>
            </AddButtonBottom>
        </>
    );
};

export default SubmissionHistory;
