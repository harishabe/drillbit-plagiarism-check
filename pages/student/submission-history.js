import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Skeleton } from '@mui/material';
import { CommonTable } from '../../components';
import { GetSubmissionData } from '../../redux/action/student/StudentAction';

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

const rows = [
    createData(
        'file1',
        '023451',
        '05/03/2022/7:10',
        '75%',
        'NA',
        42,
        'Reviewed',
        'English'
    ),
    createData(
        'file2',
        '023526',
        '08/02/2022/6:45',
        '20%',
        'NA',
        '--',
        'Pending',
        'English'
    ),
]

const SubmissionHistory = ({
    GetSubmissionData,
    submissionData,
    isLoading
}) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        GetSubmissionData();
    }, []);

    useEffect(() => {
        let row = '';
        let arr = [];
        submissionData?.map((submission) => {
            row =
                createData(
                    submission.name,
                    submission.id,
                    submission.date,
                    submission.similarity,
                    submission.grammer,
                    submission.score,
                    submission.status,
                    submission.language,
                );
            arr.push(row)
        });
        setRows([...arr]);
    }, [submissionData]);
    return (
        <>
            { isLoading ?
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

const mapStateToProps = (state) => ({
    submissionData: state?.detailsData?.submissionData,
    isLoading: state?.detailsData?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetSubmissionData: () => dispatch(GetSubmissionData()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionHistory);
