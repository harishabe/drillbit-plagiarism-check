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
        { id: 'filename', label: 'File name', isDownload:true },
        { id: 'id', label: 'Paper ID' },
        { id: 'date', label: 'Date' },
        { id: 'similarity', label: 'Similarity' },
        { id: 'grammer', label: 'Grammar' },
        { id: 'score', label: 'Marks' },
        { id: 'status', label: 'Status' },
        { id: 'feedback', label: 'Feedback' },
    ];

    useEffect(() => {
        let row = '';
        let arr = [];
        submissionData?.map((submission) => {
            row =
                createData(
                    <EllipsisText value={ submission.original_fn } charLength={ 12 } />,
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
