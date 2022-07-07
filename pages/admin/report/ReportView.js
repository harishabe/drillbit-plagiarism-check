import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Skeleton } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useForm } from 'react-hook-form';
import { Grid, Tooltip } from '@mui/material';
import {
    CardView,
    CommonTable,
    FormComponent,
    DialogModal
} from '../../../components';
import { DownloadIcon } from '../../../assets/icon';
import FormJson from '../../../constant/form/report-submission-form.json';
import BeatLoader from "react-spinners/BeatLoader";

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

const submissionsColumns = [
    { id: 'assignment_name', label: 'Assignment Name', minWidth: 110 },
    { id: 'assignmet_id', label: 'Assignment Id', minWidth: 110 },
    { id: 'author', label: 'Author Name', minWidth: 110 },
    { id: 'clas_id', label: 'Class Id', minWidth: 110 },
    { id: 'clas_name', label: 'Class Name', minWidth: 110 },
    { id: 'email', label: 'Email', minWidth: 110 },
    { id: 'no_of_page', label: 'Number Of Pages', minWidth: 110 },
    { id: 'paper_id', label: 'Paper Id', minWidth: 110 },
    { id: 'similarity', label: 'Similarity', minWidth: 110 },
    { id: 'submission_date', label: 'Submission Date', minWidth: 110 },
    { id: 'title', label: 'Title', minWidth: 110 },
]

function submissionData(assignment_name, assignmet_id, author, clas_id, clas_name, email, no_of_page, paper_id, similarity, submission_date, title) {
    return { assignment_name, assignmet_id, author, clas_id, clas_name, email, no_of_page, paper_id, similarity, submission_date, title }
}

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
    submissionsViewDownloadData,
    isLoadingViewReport,
    isLoadingSubmission,
    isLoadingDownload,
    handleDownload,
    open,
    setOpen,
    onSend,
    closeSendDialog
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

    useEffect(() => {
        let row = '';
        let arr = [];
        submissionsViewDownloadData?.map((data) => {
            row =
                submissionData(
                    data.assignment_name,
                    data.assignmet_id,
                    data.author_name,
                    data.class_id,
                    data.class_name,
                    data.email_id,
                    data.number_of_pages,
                    data.paper_id,
                    data.similarity,
                    data.submission_date,
                    data.title,
                );
            arr.push(row)
        });
        setRows([...arr]);
    }, [submissionsViewDownloadData]);

    return (
        <CardView>
            <>
                {isLoadingViewReport ?
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                    :
                    <>
                        {
                            reportName === 'assignments' &&
                            <>
                                { isLoadingDownload ? <Skeleton /> :
                                    <Tooltip title="Download csv">
                                        <IconButton sx={ {
                                            position: 'fixed',
                                            padding: '20px',
                                            top: '9px',
                                            right: '74px'
                                        } }
                                            onClick={ handleDownload }>
                                            <DownloadButton >
                                                <DownloadIcon />
                                            </DownloadButton> 
                                        </IconButton>
                                    </Tooltip>
                                }
                                <CommonTable
                                    isCheckbox={false}
                                    tableHeader={assignmentsColumns}
                                    tableData={rows}
                                    charLength={10}
                                    path=''
                                />
                            </>
                        }

                        {
                            reportName === 'classes' &&
                            <>
                                { isLoadingDownload ? <Skeleton /> :
                                    <Tooltip title="Download csv">
                                        <IconButton sx={ {
                                            position: 'fixed',
                                            padding: '20px',
                                            top: '9px',
                                            right: '74px'
                                        } }
                                            onClick={ handleDownload }>
                                            <DownloadButton >
                                                <DownloadIcon />
                                            </DownloadButton>
                                        </IconButton>
                                    </Tooltip>
                                }
                                <CommonTable
                                    isCheckbox={false}
                                    tableHeader={classesColumns}
                                    tableData={rows}
                                    charLength={10}
                                    path=''
                                />
                            </>
                        }

                        {
                            reportName === 'submissions' &&
                            <>
                                { isLoadingSubmission ? <Skeleton /> :
                                    <Tooltip title="Download csv">
                                        <IconButton sx={ {
                                            position: 'fixed',
                                            padding: '20px',
                                            top: '9px',
                                            right: '74px'
                                        } }
                                            onClick={ setOpen }>
                                            <DownloadButton >
                                                <DownloadIcon />
                                            </DownloadButton>
                                        </IconButton>
                                    </Tooltip>
                                }
                                <CommonTable
                                    isCheckbox={false}
                                    tableHeader={submissionsColumns}
                                    tableData={rows}
                                    charLength={10}
                                    path=''
                                />
                            </>

                        }

                        {open &&
                            <>
                                <DialogModal
                                    headingTitle="Mail"
                                    isOpen={true}
                                    fullWidth="sm"
                                    maxWidth="sm"
                                handleClose={ closeSendDialog }
                                >
                                    <form onSubmit={handleSubmit(onSend)}>
                                        <Grid container>
                                            {FormJson?.map((field, i) => (
                                                <Grid md={12} style={{ marginLeft: '8px' }}>
                                                    <FormComponent
                                                        key={i}
                                                        field={field}
                                                        control={control}
                                                        isLoading={ isLoadingSubmission && <BeatLoader color="#fff" /> }
                                                    />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </form>
                                </DialogModal>
                            </>
                        }
                    </>
                }
            </>
        </CardView>
    )
}

export default ReportView;