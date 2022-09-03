import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Skeleton } from '@mui/material';
import {
    CommonTable,
    CreateDrawer,
    EllipsisText,
    ErrorBlock
} from '../../components';
import SubmissionForm from './form/SubmissionForm';
import Pagination from '@mui/material/Pagination';
import { SUBMISSION_NOT_FOUND } from '../../constant/data/ErrorMessage';

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
                    submission.original_fn,
                    submission.paper_id,
                    submission.date_up,
                    submission.percent,
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
            { isLoadingSubmission ? <Skeleton /> :
                <>
                    <CommonTable
                        isCheckbox={ false }
                        isSorting={ true }
                        tableHeader={ columns }
                        tableData={ rows }
                        charLength={ 11 }
                        downloadSubmissionFile={handleOriginalFileDownload}
                    />
                </>
            }

            <div style={ { marginLeft: '45%', marginTop: '25px' } }>
                <Pagination
                    count={ pageDetails?.totalPages }
                    onChange={ handleChange }
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </div>

            <AddButtonBottom>
                <CreateDrawer
                    title="New Submission"
                    isShowAddIcon={ true }
                >
                    <SubmissionForm />
                </CreateDrawer>
            </AddButtonBottom>
        </>
    )
}

export default SubmissionHistory;
