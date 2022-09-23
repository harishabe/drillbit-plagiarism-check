import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Skeleton, Pagination } from '@mui/material';
import {
    CommonTable,
    CreateDrawer,
    EllipsisText,
    SimilarityStatus
} from '../../../components';
import { formatDate } from '../../../utils/RegExp';
import SubmissionForm from './form/SubmissionForm';

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
`;

function createData(name, paper_id, date_up, percent, grammar, score, status) {
    return { name, paper_id, date_up, percent, grammar, score, status }
}

const SubmissionHistory = ({
    submissionData,
    isLoadingSubmission,
    pageDetails,
    handleChange,
    handleOriginalFileDownload,
    handleTableSort
}) => {
    const [rows, setRows] = useState([]);

    const columns = [
        { id: 'name', label: 'File name', isDownload: true, minWidth: 140 },
        { id: 'paper_id', label: 'Paper ID', minWidth: 140 },
        { id: 'date_up', label: 'Date', minWidth: 140 },
        { id: 'similarity', label: 'Similarity', minWidth: 80 },
        { id: 'grammar', label: 'Grammar', minWidth: 80 },
        { id: 'score', label: 'Marks', minWidth: 80 },
        { id: 'status', label: 'Status', minWidth: 100 },
        { id: 'feedback', label: 'Feedback', minWidth: 80 },
    ];

    useEffect(() => {
        let row = '';
        let arr = [];
        submissionData?.map((submission) => {
            row =
                createData(
                    <EllipsisText value={submission.original_fn} charLength={12} />,
                    submission.paper_id,
                    formatDate(submission.date_up),
                    <SimilarityStatus percent={submission.percent} />,
                    submission.grammar,
                    submission.feedback?.marks,
                    submission.status,
                );
            arr.push(row)
        });
        setRows([...arr]);
    }, [submissionData]);
    return (
        <>
            <CommonTable
                isCheckbox={false}
                isSorting={true}
                tableHeader={columns}
                tableData={rows}
                downloadSubmissionFile={handleOriginalFileDownload}
                handleTableSort={handleTableSort}
                isLoading={isLoadingSubmission}
            />

            <div style={{ marginLeft: '45%', marginTop: '25px' }}>
                <Pagination
                    count={pageDetails?.totalPages}
                    onChange={handleChange}
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </div>

            <AddButtonBottom>
                <CreateDrawer
                    title="New Submission"
                    isShowAddIcon={true}
                >
                    <SubmissionForm />
                </CreateDrawer>
            </AddButtonBottom>
        </>
    )
}

export default SubmissionHistory;
