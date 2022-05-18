import React from 'react'
import { CommonTable } from '../../components'

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

function createData(
    name,
    id,
    date,
    similarity,
    grammer,
    score,
    status,
    language
) {
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

const SubmissionHistory = () => {
    return (
        <>
            {' '}
            <CommonTable isCheckbox={false} tableHeader={columns} tableData={rows} />
        </>
    )
}

export default SubmissionHistory
