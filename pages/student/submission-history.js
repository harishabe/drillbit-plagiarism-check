import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import { CommonTable } from '../../components';

const columns = [
    { id: 'name', label: 'File name' },
    { id: 'id', label: 'Paper ID' },
    { id: 'date', label: 'Submission date' },
    { id: 'similarity', label: 'Similarity' },
    { id: 'grammer', label: 'Grammer' },
    { id: 'score', label: 'Score/Mark' },
    { id: 'status', label: 'Status' },
    { id: 'language', label: 'Language' },
]

function createData(name, id, date, similarity, grammer, score, status, language) {
    return { name, id, date, similarity, grammer, score, status, language }
}

const SubmissionHistory = ({
    submissionData,
    isLoadingSubmission,
}) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        let row = '';
        let arr = [];
        submissionData?.map((submission) => {
            row =
                createData(
                    submission.name,
                    submission.paper_id,
                    submission.date_up,
                    submission.percent,
                    submission.grammer,
                    submission.marks,
                    submission.status,
                    submission.lang1,
                );
            arr.push(row)
        });
        setRows([...arr]);
    }, [submissionData]);
    return (
        <>
            { isLoadingSubmission ?
                <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </> :
                <>
                    <CommonTable
                        isCheckbox={ true }
                        tableHeader={ columns }
                        tableData={ rows }
                    />
                </>
            } 
        </>
    )
}

export default SubmissionHistory;
