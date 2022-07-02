import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import { CommonTable } from '../../components';

function createData(name, id, date, similarity, grammer, score, status, language) {
    return { name, id, date, similarity, grammer, score, status, language }
}

const SubmissionHistory = ({
    submissionData,
    isLoadingSubmission,
}) => {
    const [rows, setRows] = useState([]);

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
                    submission.grammar,
                    submission.feedback?.marks,
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
                        isCheckbox={ false }
                        tableHeader={ columns }
                        tableData={ rows }
                    />
                </>
            } 
        </>
    )
}

export default SubmissionHistory;
