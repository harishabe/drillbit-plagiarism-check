import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Skeleton } from '@mui/material';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import {
    CardView,
    CommonTable,
    FormComponent
} from '../../../components';
import { DownloadIcon } from '../../../assets/icon';
import FormJson from '../../../constant/form/report-submission-form.json';

const DownloadButton = styled.div`
    position:fixed;
    top: 17px;
    right:80px;
`;

const assignmentsColumns = [
    { id: 'ass_id', label: 'Assignment Id', minWidth: 170 },
    { id: 'ass_name', label: 'Assignment Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'created', label: 'Created Date', minWidth: 170 },
    { id: 'endDate', label: 'End Date', minWidth: 170 },
    { id: 'class_id', label: 'Class Id', minWidth: 170 },
    { id: 'class_name', label: 'Class Name', minWidth: 170 },
    { id: 'count', label: 'Submission count', minWidth: 170 },
]

const classesColumns = [
    { id: 'cls_id', label: 'Class ID', minWidth: 170 },
    { id: 'cls_name', label: 'Class Name', minWidth: 170 },
    { id: 'created', label: 'Creation Date', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'students_count', label: 'Students Count', minWidth: 170 },
    { id: 'submissions_count', label: 'Submissions Count', minWidth: 170 },
    { id: 'validity', label: 'Validity', minWidth: 170 },
]

function assignmentData(ass_id, ass_name, email, created, endDate, class_id, class_name, count) {
    return { ass_id, ass_name, email, created, endDate, class_id, class_name, count }
}

function classesData(cls_id, cls_name, created, email, students_count, submissions_count, validity) {
    return { cls_id, cls_name, created, email, students_count, submissions_count, validity }
}

const ReportView = ({
    reportName,
    assignmentViewDownloadData,
    classesViewDownloadData,
    isLoadingViewReport,
    handleDownload,
    handleSend
}) => {
    const [rows, setRows] = useState([]);

    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    useEffect(() => {
        let row = '';
        let arr = [];
        assignmentViewDownloadData?.map((data) => {
            row =
                assignmentData(
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
    }, [assignmentViewDownloadData]);

    useEffect(() => {
        let row = '';
        let arr = [];
        classesViewDownloadData?.map((data) => {
            row =
                classesData(
                    data.class_id,
                    data.class_name,
                    data.creation_date,
                    data.email_id,
                    data.students_count,
                    data.submissions_count,
                    data.validity,
                );
            arr.push(row)
        });
        setRows([...arr]);
    }, [classesViewDownloadData]);

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
                    <>
                        <DownloadButton onClick={ handleDownload }>
                            <DownloadIcon />
                        </DownloadButton>
                        {
                            reportName === 'assignments' &&
                            <CommonTable
                                isCheckbox={ false }
                                tableHeader={ assignmentsColumns }
                                tableData={ rows }
                                charLength={ 10 }
                                path=''
                            />
                        }

                        {
                            reportName === 'classes' &&
                            <CommonTable
                                isCheckbox={ false }
                                tableHeader={ classesColumns }
                                tableData={ rows }
                                charLength={ 10 }
                                path=''
                            />
                        }

                        {
                            reportName === 'submissions' &&
                            <form onSubmit={ handleSend }>
                                <Grid container>
                                    { FormJson?.map((field, i) => (
                                        <Grid md={ 12 } style={ { marginLeft: '8px' } }>
                                            <FormComponent
                                                key={ i }
                                                field={ field }
                                                control={ control }
                                                isLoading={ isLoadingViewReport }
                                            />
                                        </Grid>
                                    )) }
                                </Grid>
                            </form>
                        }
                    </>
                }
            </>

        </CardView>
    )
}

export default ReportView;