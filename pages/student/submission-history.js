import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Skeleton } from '@mui/material';
import {
    CommonTable,
    CreateDrawer,
    EllipsisText,
    SimilarityStatus,
    ErrorBlock
} from '../../components';
import SubmissionForm from './form/SubmissionForm';
import Pagination from '@mui/material/Pagination';
import { NO_DATA_PLACEHOLDER, DOC_ERROR_PLACEHOLDER_1, DOC_ERROR_PLACEHOLDER_2 } from '../../constant/data/Constant'

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
`;

function createData(filename, id, date, similarity, grammer, score, status) {
    return { filename, id, date, similarity, grammer, score, status }
}

const SubmissionHistory = ({
    submissionData,
    isLoadingSubmission,
    pageDetails,
    handleChange,
    handleOriginalFileDownload,
}) => {
    const [rows, setRows] = useState([]);

    const columns = [
        { id: 'filename', label: 'File name', isDownload: true, minWidth: 140 },
        { id: 'id', label: 'Paper ID', minWidth: 140 },
        { id: 'date', label: 'Date', minWidth: 140 },
        { id: 'similarity', label: 'Similarity', minWidth: 80 },
        { id: 'grammer', label: 'Grammar', minWidth: 80 },
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
                    submission.date_up,
                    <SimilarityStatus percent={ submission.percent } />,
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
            {isLoadingSubmission ? <Skeleton /> :
                <>
                    <CommonTable
                        isCheckbox={false}
                        isSorting={true}
                        tableHeader={columns}
                        tableData={rows}
                        downloadSubmissionFile={handleOriginalFileDownload}
                    />
                </>
            }

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
