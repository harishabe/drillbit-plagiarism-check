import React, { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import {
    CardView,
    CommonTable,
} from '../../../components';

const columns = [
    { id: 'ass_id', label: 'Assignment ID', minWidth: 170 },
    { id: 'ass_name', label: 'Assignment Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'created', label: 'Created ID', minWidth: 170 },
    { id: 'endDate', label: 'End Date', minWidth: 170 },
    { id: 'class_id', label: 'Class ID', minWidth: 170 },
    { id: 'class_name', label: 'Class Name', minWidth: 170 },
    { id: 'count', label: 'Submission count', minWidth: 170 },
]

function createData(ass_id, ass_name, email, created, endDate, class_id, class_name, count) {
    return { ass_id, ass_name, email, created, endDate, class_id, class_name, count }
}


const ReportView = ({
    viewDownloadData,
    isLoadingViewReport
}) => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        let row = '';
        let arr = [];
        viewDownloadData?.map((data) => {
            row =
                createData(
                    data.assignment_id,
                    data.assignment_name,
                    data.email_id,
                    data.created_id,
                    data.end_date,
                    data.class_id,
                    data.class_name,
                    data.submissions_count,
                );
            arr.push(row)
        });
        setRows([...arr]);
    }, [viewDownloadData]);

    return (
        <CardView>
            <>
                { isLoadingViewReport ?
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                    :
                    <CommonTable
                        isCheckbox={ false }
                        tableHeader={ columns }
                        tableData={ rows }
                        charLength={ 17 }
                        path=''
                    />
                }
            </>

        </CardView>
    )
}

export default ReportView;